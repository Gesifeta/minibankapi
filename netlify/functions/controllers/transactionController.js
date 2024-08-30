import Transactions from "../models/transactionModel.js";
import Accounts from "../models/accountModel.js";

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getHours();
const second = date.getSeconds();

//@ description   Make deposit
//@ Route         Post  /customers/transaction/deposits
//@ access        Private

export const createDeposit = async (req, res) => {
  try {
    const { userid, creditaccount, debitaccount, amount } = req.body;

    // check if ammount and account exist, and then update account balance
    if (!creditaccount || !amount) {
      return res.json({
        message: "Account Number and Deposit Amount are required",
      });
    } else {
      const findcreditAccount = await Accounts.findOne({
        account: creditaccount,
      });
      if (!findcreditAccount) {
        return res.json({ message: "Account number not found" });
      } else {
        await Accounts.findOneAndUpdate(
          { account: creditaccount },
          {
            $set: {
              balance: findcreditAccount.balance + Number(amount),
              userid: userid,
            },
          }
        );
        // create transaction for every deposit
        const newTransaction = new Transactions({
          userid: userid,
          debitaccount: debitaccount,
          creditaccount: creditaccount,
          amount: amount,
          type: "Deposit",
        });
        await newTransaction.save();
        return res.json({
          message: `Successfuly deposited`,
        });
      }
    }
  } catch (error) {
    return error;
  }
};
//@ description   Check if the account number and name matches and makes transfere
//@ Route         GET  /transaction/validate
//@ access        Private
export const validateAccounts = async (req, res) => {
  try {
    
 
  const { debitaccount, creditaccount, amount } = req.body;
  //the section starts by validating account, name, and minimimum balances
  if (!debitaccount || !creditaccount || !amount) {
    return res.json({ message: "All fields are required" });
  } else {
    //To check of the account numbers exist and  name matches for the transfer
    const [debit, credit] = await Accounts.find({
      $or: [{ account: debitaccount }, { account: creditaccount }],
    });
    if (!debit || !credit) {
      return res.json({ message: "Debit or Credit account not found" });
    }
    // checks if the account minimum balance 100. If the balance is less than 100 after
    //transfer the transaction should exit.
    else {
      if (debit.balance < Number(amount) + 100) {
        return res.status(200).json({ message: "Insufficient Balance" });
      } else {
        return res.json({
          debitName: `${debit.firstName} ${debit.lastName}`,
          creditName: `${credit.firstName} ${credit.lastName}`,
        });
      }
    }
  }
} catch (error) {
  return error
}
};

//@ description   Check if the account number and name matches and makes transfere
//@ Route         PUT  /transaction/transfer
//@ access        Private
export const transferAmount = async (req, res) => {
  try {
    const { debitaccount, creditaccount, userid, amount } = req.body;
    //the section starts by validating account, name, and minimimum balances
    if (!debitaccount || !creditaccount || !amount) {
      return res.json({ message: "All fields are required" });
    } else {
      //To check of the account numbers exist and  name matches for the transfer

      const debitAccountFound = await Accounts.findOne({
        $and: [{ account: debitaccount }, { userid: userid }],
      });
      const creditAccountFound = await Accounts.findOne({
        account: creditaccount,
      });

      if (!debitAccountFound) {
        return res.json({ message: "Debit is not yours." });
      } else if (!creditAccountFound) {
        return res.json({ message: "Credit account not found." });
      } else if (debitaccount === creditaccount) {
        return res.json({ message: "Debit and Credit account are the same" });
      }
      // checks if the account minimum balance 100. If the balance is less than 100 after
      //transfer the transaction should exit.
      else if (debitAccountFound.balance < Number(amount) + 100) {
        return res.status(200).json({ message: "Insufficient Balance" });
      } else {
        // transaction for Debit side
        const transactionDebit = new Transactions({
          userid: userid,
          debitaccount: debitaccount,
          creditaccount: creditaccount,
          amount: -amount,
          type: "Transfer",
        });
        await transactionDebit.save();

        // Updating the debited account
        // find the debited account and decrease by the amount
        await Accounts.findOneAndUpdate(
          {
            account: debitaccount,
          },
          { $set: { balance: debitAccountFound.balance - Number(amount) } }
        );
        // update the credited account
        // find the creadited account and increase by the amount
        await Accounts.findOneAndUpdate(
          {
            account: creditaccount,
          },
          { $set: { balance: creditAccountFound.balance + Number(amount) } }
        );

        return res.status(200).json({ message: "successfuly transfered" });
      }
    }
  } catch (error) {
    return error;
  }
};
//@ description   Find account balance information s
//@ Route         GET  //transaction/find
//@ access        Private
export const findTransaction = async (req, res) => {
  try {
    const foundUser = await Transactions.find({ userid: req.params.userid });
    return res.json(foundUser);
  } catch (error) {
    return error;
  }
};

export default {
  createDeposit,
  findTransaction,
  transferAmount,
  validateAccounts,
};
