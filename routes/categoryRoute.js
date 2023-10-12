import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategories, getSingleCategory, updateCategoryController } from "../controller/categoryController.js";
const router = express.Router();

// route
router.post("/create-category",requireSignIn,isAdmin,createCategoryController);

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

router.get("/get-category",getAllCategories);

router.get("/single-category/:slug",getSingleCategory);

router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);


export default router;