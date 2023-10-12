import express from "express";
// router
const router = express.Router();
import {
    forgotPasswordController,
    getAllOrdersController,
    getOrdersController,
    loginController,
    orderStatusController,
    registerController,
    testController,
    updateProfileController
} from "../controller/authControllers.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routing
// REGISTER - POST
router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password",forgotPasswordController);

router.get("/test",requireSignIn,isAdmin,testController);

// user route
router.get("/user-auth",requireSignIn,(req,res) => {
    res.status(200).send({ok:true});
})

// Admin Route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ok:true});
})


router.put("/profile",requireSignIn,updateProfileController);


// orders
router.get("/orders",requireSignIn,getOrdersController);

router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController);

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);


export default router;