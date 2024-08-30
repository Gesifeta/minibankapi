import Customers from "../models/customerModel.js";
//@ description   GET List all customers
//@ Route         /users/getME
//@ access        Public
export const findCustomer = async (req, res) => {
  try {
    const { firstName, lastName, telephone } = req.body;
    if (!firstName || !lastName || telephone) {
      return res.status(201).json({ message: "All fields are required" });
    } else {
      const customerFound = await Customers.find({
        $and: [{ firstName: firstName }, { lastName: lastName }],
      });

      if (customerFound.length === 0) {
        res.status(404).json({ message: "customer not found" });
      } else {
        return res.status(200).json(customerFound);
      }
    }
  } catch (error) {
    return error;
  }
};
export const createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      DoB,
      telephone,
      address: { street: street, city: city, country: country },
      products: products,
    } = req.body;

    const newCustomer = new Customers({
      firstName,
      lastName,
      gender,
      DoB,
      telephone,
      address: { street: street, city: city, country: country },
      products: products,
    });
    await newCustomer.save();

    return res.status(201).json({ message: "Successfuly submitted" });
  } catch (error) {
    return error;
  }
};
export const udpdateCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      telephone,
      address: { city, street, country },
    } = req.body;
    if (!firstName || !lastName || !telephone) {
      return res.status(201).json({ message: "All fields are required" });
    } else {
      const customerFound = await Customers.findOneAndUpdate(
        {
          $and: [
            { firstName: firstName },
            { lastName: lastName },
            { telephone: telephone },
          ],
        },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            telephone: telephone,
            address: { street: street, city: city, country: country },
          },
        }
      );
      if (customerFound === null) {
        res.send("customer not found");
      } else {
        return res
          .status(200)
          .json({ message: "Successfuly updated", customerFound });
      }
    }
  } catch (error) {
    return error;
  }
};
export const deleteCustomer = async (req, res) => {
  try {
    const { firstName, lastName, telephone } = req.body;
    if (!firstName || !lastName || !telephone) {
      return res.status(201).json({ message: "All fields are required" });
    } else {
      const customerFound = await Customers.findOneAndDelete({
        $and: [
          { firstName: firstName },
          { lastName: lastName },
          { telephone: telephone },
        ],
      });
      if (customerFound === null) {
        res.send("customer not found");
      } else {
        return res
          .status(200)
          .json({ message: "Successfuly updated", customerFound });
      }
    }
  } catch (error) {
    return error;
  }
};
