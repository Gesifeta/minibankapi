import mongoose from "mongoose";

export const accountScheme = new mongoose.Schema(
  {
    userid: { type: String, required: [true, "userid is requeired"] },
    account: { type: String, required: [true, "account number is requeired"] },
    balance: { type: Number },
    firstName: { type: String, required: [true, "first name is requeired"] },
    lastName: { type: String, required: [true, "last name is requeired"] },
    type: {
      type: String,
      enum: ["Saving", "Checking", "Fixed Time"],
      default: "Saving",
    },
    interest:Number,
  },
  { timestamps: true }
);
export default mongoose.model("Accounts", accountScheme);
