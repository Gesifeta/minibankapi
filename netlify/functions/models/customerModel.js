import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required, please enter"],
    },
    lastName: {
      type: String,
      required: [true, " Last Name is required, please enter"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required, please enter"],
    },
    DoB: { type: String, required: [true, "Date of birth is required, please enter"] },
    telephone: {
      type: String,
      required: [true, "Telephone number is required"],
    },
    address: {
      street: {
        type: String,
        required: [true, "Street is required, please enter"],
      },
      city: {
        type: String,
        required: [true, "City is required, please enter"],
      },
      country: {
        type: String,
        required: [true, "Country is required, please enter"],
      },
    },
    products:{type:[String],enum:['Saving',"Mortgage","Investment"], default:"Saving"}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Customers", customerSchema);
