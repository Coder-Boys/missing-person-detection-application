import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    role: { type: String, default: "user" },
    image: { type: String },
    textarea: { type: String, required: false },
    authProviderId: { type: String },
  },
  { timestamps: true }
);

const missingPersonSchema = new Schema(
  {
    name: { type: String, required: false },
    age: { type: String, required: false },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: false },
    missing: { type: String, default: true },
    textarea: { type: String, required: false },
  },
  { timestamps: true }
);

const MissingPerson =
  mongoose.models?.MissingPerson ||
  mongoose.model("MissingPerson", missingPersonSchema);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export { User, MissingPerson };
