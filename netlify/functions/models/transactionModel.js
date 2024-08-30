import mongoose from "mongoose";

export const userBalanceScheme = new mongoose.Schema(
  {
    userid: { type: String, required: [true, "userid is requeired"] },
    debitaccount: {
      type: String,
      required: [true, "Debit account number is requeired"],
    },
    creditaccount: {
      type: String,
      required: [true, "Credit account number is requeired"],
    },
    amount: { type: Number, required: [true, "amount is requeired"] },
    type: { type: String, enum: ["Withdrawal", "Transfer", "Deposit"] },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Transactions", userBalanceScheme);
