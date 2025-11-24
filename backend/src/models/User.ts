import mongoose, { Document, Schema } from "mongoose";

export interface IFavourite {
  releasePublicKey: string;
  addedAt: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  favourites: IFavourite[];
}

const FavouriteSchema = new Schema<IFavourite>(
  {
    releasePublicKey: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favourites: { type: [FavouriteSchema], required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
