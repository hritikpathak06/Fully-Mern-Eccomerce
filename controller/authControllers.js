import { comparePassword, hashPassword } from "../helper/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


// REGISTER CONTROLLER
export const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    // validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.send({ message: "Please fill all the details" })
    };

    // check user
    const existingUser = await userModel.findOne({ email: email });

    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered.please login"
      })
    }

    // register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({ username, email, password: hashedPassword, phone, address, answer }).save();

    res.status(201).send({
      success: false,
      messgae: "user registered successfully",
      user,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error
    })
  }
}



// LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password"
      })
    }

    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //   token
    const token = await JWT.sign({ _id: user._id }, "ABCFRYAHKAJAKHJAKHAAKJAOOJUAIAOJUIAUOIAOI", {
      expiresIn: '7d'
    })

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        answer: user.answer,
        role: user.role
      },
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error
    })
  }
}



// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    //   check 
    const user = await userModel.findOne({ email: email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password reset successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    })
  }
}




// UPDATE PROFILE CONTROLLER
export const updateProfileController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    const user = await userModel.findById(req.user._id);

    // password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 characters long " });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined

    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      username: username || user.username,
      password: hashedPassword || user.password,
      phone: phone || user.phone,
      address: address || user.address
    }, { new: true })

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error
    })
  }
}




// test controller
export const testController = (req, res) => {
  res.send("protected route")
}




// ORDERS
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "username");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};





// ALL ORDERS
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "username")
      .sort({createdAt:"-1"})
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders",
      error
    })
  }
}




// UPDATE ORDERS STATUS CONTROLLER
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

