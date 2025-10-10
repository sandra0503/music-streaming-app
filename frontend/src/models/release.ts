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
  hub: Hub;
  publisher: string;
  publisherAccount: PublisherAccount;
}

export interface ReleaseMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  animation_url: string;
  external_url: string;
  attributes: Attribute[];
  collection: Collection;
  properties: Properties;
}

export interface Attribute {
  trait_type?: string;
  value?: string | number;
}

export interface Collection {
  name: string;
  family: string;
}

export interface Properties {
  tags: string[];
  title: string;
  date: string;
  files: File[];
  category: string;
}

export interface File {
  uri: string;
  track: number;
  track_title: string;
  duration: number;
  type: string;
}

export interface Hub {
  publicKey: string;
  handle: string;
  data: HubData;
  datetime: string;
  dataUri: string;
  updatedAt: string;
  authority: string;
}

export interface HubData {
  displayName: string;
  description: string;
  externalurl: string;
  image: string;
}

export interface PublisherAccount {
  publicKey: string;
  image: string;
  description: string;
  displayName: string;
  handle: string;
  verifications: any[];
  followers: number;
}
