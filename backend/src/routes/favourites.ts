// routes/favorites.ts
import express from "express";
import User from "../models/User";
import { auth, AuthRequest } from "../middleware/auth";
import { getNinaRelease } from "../services/nina";
import { Release } from "../models/release";

const router = express.Router();

router.get("/", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const user = await User.findById(userId).select("favourites");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch all favourite releases from Nina in parallel
    const releases: (Release | null)[] = await Promise.all(
      user.favourites.map(async (fav) => {
        const data = await getNinaRelease(fav.releasePublicKey);
        if (data) {
          data.addedAt = fav.addedAt; // attach when favourite was added
        }
        return data;
      })
    );

    // Filter out null (in case some Nina releases are missing)
    const validReleases = releases.filter((r) => r !== null);

    // Optional: sort by date added (newest first)
    validReleases.sort((a, b) => b.addedAt!.getTime() - a.addedAt!.getTime());

    res.json({ favourites: validReleases });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/list", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const user = await User.findById(userId).select("favourites");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.favourites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const publicKey = req.query.key;

    if (!publicKey) {
      return res.status(400).json({ error: "Missing publicKey" });
    }

    const result = await User.updateOne({ _id: userId }, [
      {
        $set: {
          favourites: {
            $cond: [
              {
                $in: [publicKey, "$favourites.releasePublicKey"],
              },
              "$favourites", // already exists → return unchanged
              {
                $concatArrays: [
                  "$favourites",
                  [
                    {
                      releasePublicKey: publicKey,
                      addedAt: Date.now(),
                    },
                  ],
                ],
              },
            ],
          },
        },
      },
    ]);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/remove", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const publicKey = req.query.key;

    if (!publicKey) {
      return res.status(400).json({ error: "Missing publicKey" });
    }

    const result = await User.updateOne({ _id: userId }, [
      {
        $set: {
          favourites: {
            $cond: [
              {
                $in: [publicKey, "$favourites.releasePublicKey"],
              },
              "$favourites", // already exists → return unchanged
              {
                $concatArrays: [
                  "$favourites",
                  [
                    {
                      releasePublicKey: publicKey,
                      addedAt: Date.now(),
                    },
                  ],
                ],
              },
            ],
          },
        },
      },
    ]);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
