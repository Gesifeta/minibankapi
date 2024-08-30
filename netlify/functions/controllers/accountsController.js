import bcrypt from "bcryptjs";
import Accounts from "../models/accountModel.js";
import Users from "../models/userModel.js";

//@ description   PUT create new Accounts
//@ Route         /account/create
//@ access        Public
export const createAccount = async (req, res) => {
  try {
    if (!req.isAuthenticated) {
      return res.json({ message: "You are not authorized to view this page" })
    }
    const { userid, account, type, firstName, lastName, amount } = req.body;
    if (!account || !type || !amount) {
      return res.json({
        message: "Account Number and Deposit Amount are required",
      });
    } else {
      const findAccount = await Accounts.findOne({ account: account });

      if (findAccount !== null) {
        return res.json({ message: "Account Already Exist" });
      } else {
        const createAccount = new Accounts({
          userid: userid,
          firstName: firstName,
          lastName: lastName,
          account: account,
          type: type,
          balance: amount,
          interest: (amount * 0.07) / 12,
        });
        await createAccount.save();
        return res.json({ message: "Successfuly opened" });
      }
    }
  } catch (error) {
    return error;
  }
};
//@ description   GET find and Account
//@ Route         /account/update
//@ access        Private
export const findAccount = async (req, res) => {
  try {
    //check if user is authenticated
    if (!req.isAuthenticated) {
      return res.json({ message: "You are not authorized to view this page" })
    }
    const userid = req.params.userid;
    if (!userid) {
      return res.json({ message: "Account IS required" });
    } else {
      const foundAccount = await Accounts.find({ userid: userid });
      if (foundAccount === null) {
        return res.json({ message: "Account not found" });
      } else {
        return res.json(foundAccount);
      }
    }
  } catch (error) {
    return error;
  }
};
//@ description   PUT update Account
//@ Route         /account/update
//@ access        Private
export const updateAccount = async (req, res) => {
  try {
    if (!req.isAuthenticated) {
      return res.json({ message: "You are not authorized to view this page" })
    }
    const { account, firstName, lastName, type } = req.body;
    if (!account) {
      return res.json({ message: "Email is required" });
    } else {
      const updatedAccount = await Accounts.findOneAndUpdate(
        { account: account },
        {
          $set: {
            account: account,
            firstName: firstName,
            lastName: lastName,
            status: type,
          },
        }
      );
      if (updatedAccount === null) {
        return res.json({ message: "Account not found" });
      } else {
        return res.json({ message: "Successfuly updated", updateAccount });
      }
    }
  } catch (error) {
    return "Your search has encountered a problem";
  }
};
//@ description   Used to close Accounts after checking authorizations
//@ Route         POST  /account/deleteAccount
//@ access        Private
export const deleteAccount = async (req, res, next) => {
  try {
    const { account, password, email } = req.body;
    const accountFound = await Accounts.findOne({ account: account });
    const userFound = await Users.findOne({ email: email });
    if (!account || !password) {
      res.status(200).json({ message: "Account and password is required" });
    } else {
      if (accountFound === null) {
        res.status(200).json({ message: "Account not found" });
      } else {
        if (await bcrypt.compare(password, userFound.password)) {
          const foundUser = await Accounts.deleteOne({ account: account });
          if (foundUser.deletedCount > 0) {
            res.status(200).json({ message: "Account successfuly deleted " });
          } else {
            res.status(403).json({ message: "Unable to delete account" });
          }
        } else {
          res.status(403).json({ message: "Incorrect Password" });
        }
      }
    }
  } catch (error) {
  return error;
  }
};
