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
  addedAt?: Date;
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
