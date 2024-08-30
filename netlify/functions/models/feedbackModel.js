import mongoose from "mongoose";

export const mailSchema = new mongoose.Schema({
  name: { type: String, required: [true, " Name is required"] },
  email: { type: String, required: [true, " Email is Required"] },
  feedback: { type: String, required: [true, "Please, write you feedback."] },
  status:{type: String, enum:["unread","inprogress","addressed"], default:"unread"},
  response:{type:String}
},{
  timestamps:true,
});

export default mongoose.model("Feedbacks",mailSchema)
