import express, { Request, Response } from "express";
import { auth } from "../middleware/auth";

const router = express.Router();

const URL_V1 = "https://services.ninaprotocol.com/v1";

export interface Release {
  publicKey: string;
  mint: string;
  metadata: ReleaseMetadata;
  datetime: string;
  slug: string;
  price: string;
  paymentMint: string;
  archived: boolean;
  publishedThroughHub: string;
  publisher: string;
}

export interface ReleaseMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  animation_url: string;
  external_url: string;
}

router.get("/discover", auth, async (req: Request, res: Response) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  const endpoint = `${URL_V1}/hubs/ninas-picks/releases?limit=${limit}&offset=${offset}&sort=desc`;

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
