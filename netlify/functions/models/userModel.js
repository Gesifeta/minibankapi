import mongoose from "mongoose";


export const userScheme = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "first name is requeired"] },
    lastName: { type: String, required: [true, "last name is requeired"] },
    email: {
      type: String,
      lowercase: [true],
      unique: [true, "email already exist"],
      required: [true, "email is requeired"],
    },
    password: {
      type: String,
      minlength: [8, "Your password should be atleast 8 chararcters long"],
      required: [true, "passowrd is requeired"],
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Users", userScheme);
