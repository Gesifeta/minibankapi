import Feedbacks from "../models/feedbackModel.js";

//@ description   POST create new feedbacks
//@ Route         /feedback/create
//@ access        Public
export const createFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    if (!name || !email || !feedback) {
      return res.json({ message: "All fields are required" });
    } else {
      const newFeedback = new Feedbacks({
        name: name,
        email: email,
        feedback: feedback,
      });
      await newFeedback.save();
      return res.json({
        message: "Your feedback has been successfully submitted",
        newFeedback,
      });
    }
  } catch (error) {
    return "Your search has encountered a problem";
  }
};

//@ description   GET create new feedbacks
//@ Route         /feedback/find
//@ access        Public
export const findFeedback = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: "Email IS required" });
    } else {
      const foundFeedback = await Feedbacks.findOne({ email: email });
      if (foundFeedback === null) {
        return res.json({ message: "Feedback not found" });
      } else {
        return res.json({ message: foundFeedback });
      }
    }
  } catch (error) {
    return "Your search has encountered a problem";
  }
};
//@ description   PUT create new feedbacks
//@ Route         /feedback/update
//@ access        Private
export const updateFeedback = async (req, res) => {
  try {
    const { email, response, status } = req.body;
    if (!email) {
      return res.json({ message: "Email is required" });
    } else {
      const updatedFeedback = await Feedbacks.findOneAndUpdate(
        { email: email },
        { $set: { response: response, status: status } }
      );
      if (updatedFeedback === null) {
        return res.json({ message: "Feedback not found" });
      } else {
        return res.json({ message: "Successfuly updated", updateFeedback });
        updatedFeedback;
      }
    }
  } catch (error) {
    return "Your search has encountered a problem";
  }
};
//@ description   DELETE create new feedbacks
//@ Route         /feedback/delete
//@ access        private
export const deleteFeedback = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: "Email is required" });
    } else {
      const foundEmail = await Feedbacks.deleteOne({ email: email });

      if (foundEmail.deletedCount === 0) {
        return res.json({ message: "Feedback not found" });
      } else {
        return res.json({ message: "successfuly deleted" });
      }
    }
  } catch (error) {
    return "Your search has encountered a problem";
  }
};
