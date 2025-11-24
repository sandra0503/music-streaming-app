import { Release } from "../models/release";

export async function getNinaRelease(
  publicKey: string
): Promise<Release | null> {
  try {
    const res = await fetch(
      `https://services.ninaprotocol.com/v1/releases/${publicKey}`
    );
    if (!res.ok) return null;

    const data = await res.json();

    return data.release;
  } catch (err) {
    console.error(`Error fetching Nina release with key ${publicKey}:`, err);
    return null;
  }
}
