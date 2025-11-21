import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    animeTitle: String, 
    animeImg: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: String
  },
  { timestamps: true }
);

export const HistoryModel = mongoose.model("History", historySchema, "history");
