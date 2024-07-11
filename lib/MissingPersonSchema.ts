import mongoose, { Schema } from "mongoose";

const missingPersonSchema = new Schema(
  {
    name: { type: String, required: false },
    age: { type: String, required: false },
    location: { type: String, required: true },
    contact: { type: String, required: true },

    imageUrl: { type: String, required: true },
    userId: { type: String, required: false },
    missing: { type: String, default: true },
  },
  { timestamps: true }
);

const MissingPerson =
  mongoose.models?.MissingPerson ||
  mongoose.model("MissingPerson", missingPersonSchema);

export default MissingPerson;
