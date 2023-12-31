import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


// CREATE CATEGORY
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exist"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();

        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in category"
        })
    }
}



// UPDATE CATEGORY
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, {
            new: true
        })
        res.status(200).send({
            success: true,
            message: "catgeory updated Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })
    }
}




// GET ALL CATEGORY
export const getAllCategories = async (req, res) => {
    try {
        const category = await categoryModel.find();
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "category not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "All category found",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all the categories",
            error
        })
    }
}




// GET SINGLE CATEGORY
export const getSingleCategory = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug });

        res.status(200).send({
            success: true,
            message: "Get single category success",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error
        })
    }
}




// DELETE CATEGORY
export const deleteCategoryController = async(req,res) => {
    try {
        const{id} = req.params
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            res.status(404).send({
                message:"Category already deleted"
            })
        }
        res.status(200).send({
            success:true,
            message:"Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        })
    }
}