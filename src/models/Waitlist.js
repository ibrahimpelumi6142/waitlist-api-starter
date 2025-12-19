import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    incomeRange: { type: String, default: "Not specified", trim: true },
    interestedFeatures: { type: [String], default: [] }
  },
  { timestamps: true }
);

waitlistSchema.index({ createdAt: -1 });

export const Waitlist = mongoose.model("Waitlist", waitlistSchema);
