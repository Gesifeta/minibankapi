import bcrypt from "bcryptjs";
import GenerateToken from "../config/token.js";
import Users from "../models/userModel.js";

//@ description   List all users
//@ Route         GET  /users
//@ access        Public
export const findUser = async (req, res) => {
  try {
    if (!req.token) return res.status(401).send(`
      <div>
      <h1>Unauthorized Section</h1>
    <p> please login to get token </p>
     </div>
      `);
    const User = await Users.find().select("-password");
    return res.status(200).send(User);
  } catch (error) {
    return error;
  }
};

//@ description   List all users
//@ Route         GET  /users/creeate
//@ access        Private
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, password1 } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.json({ message: "All fields are required" });
    } else {
      const emailFound = await Users.findOne({ email: email });
      if (emailFound) {
        return res.json({ message: "Email already exist" });
      } else {
        //create token

        // generate salt with 10 iteration
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Users({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          isAdmin: email === "adamgemechu@gmail.com" ? true : false,
        });
        await newUser.save();

        return res.status(201).json({ message: "Successfuly completed" });
      }
    }
  } catch (error) {
    return error;
  }
};
//@ Description   User login
//@ Route         Post /users/login
//@ access        Public

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please enter email and password" });
    } else {
      const foundUser = await Users.findOne({ email: email });
      if (foundUser === null) {
        return res.json({ message: "Email address not registered" });
      } else if (
        foundUser.email === email &&
        (await bcrypt.compare(password, foundUser.password))
      ) {
        const user = {
          userid: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
        };
        // GENERATE TOKEN FOR LOGGED IN USERS
        const token = GenerateToken(user);
        res.status(200).json({ message: "Successfuly completed", token });
      } else {
        return res.json({ message: "Invalid Password or Email" });
      }
    }
  } catch (error) {
    return error;
  }
};

//@ description   Update user data
//@ Route         PUT /users/update
//@ access        Private

export const updateUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const User = await Users.find();
    if (User === null) {
      return res.send("User not found");
    } else {
      const { email } = req.user;
      const updatedUser = await Users.findOneAndUpdate({
        emailisAdmin: true,
      });
      return res.send(User);
    }
  } catch (error) {
    return error;
  }
};
//@ description   Delete user
//@ Route         DELETE /users/delete
//@ access        Private

export const deleteUser = async (req, res) => {
  try {
    const delet = await Users.findOneAndDelete(req.body.email);
    if (!delet) {
      return res.send("User not found");
    } else {
      return res.json({ message: "User Successfuly deleted" });
    }
  } catch (error) {
    return error;
  }
};
export default { findUser, createUser, updateUser, deleteUser };
