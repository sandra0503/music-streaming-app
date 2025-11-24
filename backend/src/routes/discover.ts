import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";
import { Release } from "../models/release";

const router = express.Router();

const URL_V1 = "https://services.ninaprotocol.com/v1";

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const query = (req.query.query as string) || "";

    const querySearch =
      query.length > 0 ? `&query=${encodeURIComponent(query)}` : "";

    const endpoint = `${URL_V1}/releases?limit=${limit}&offset=${offset}&sort=desc${querySearch}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching releases:", err);
    return res.status(500).json({ error: "Failed to fetch releases" });
  }
});

router.get("/picks", auth, async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const query = (req.query.query as string) || "";

    const querySearch =
      query.length > 0 ? `&query=${encodeURIComponent(query)}` : "";

    const endpoint = `${URL_V1}/hubs/ninas-picks/releases?limit=${limit}&offset=${offset}&sort=desc${querySearch}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching releases:", err);
    return res.status(500).json({ error: "Failed to fetch releases" });
  }
});

router.get("/tags/:tag", auth, async (req: Request, res: Response) => {
  const { tag } = req.params;
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  const endpoint = `${URL_V1}/tags/${encodeURIComponent(
    tag
  )}?limit=${limit}&offset=${offset}&sort=desc&column=datetime&query=${encodeURIComponent(
    tag
  )}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ msg: `Failed to fetch: ${response.statusText}` });
    }

    const data = (await response.json()) as { releases: Release[] };
    res.json(data);
  } catch (err: any) {
    console.error("Error fetching from Nina:", err.message);
    res
      .status(500)
      .json({ msg: "Error fetching from Nina", error: err.message });
  }
});

export default router;
