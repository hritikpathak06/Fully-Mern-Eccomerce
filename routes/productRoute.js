import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { braintreePaymentsController, braintreeTokenController, createProductController, deleteProductController, getAllProducts, getSingleProductController, productCountController, productFiltersController, productPageController, productPhotoController, searchProductController, updateProductController } from "../controller/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes

router.post("/create-product",
requireSignIn,
isAdmin,
formidable(),
createProductController
)


router.get("/get-products",getAllProducts);

router.get("/get-product/:slug",getSingleProductController);

router.get("/product-photo/:pid",productPhotoController);


router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteProductController);

router.put("/update-product/:pid",
requireSignIn,
isAdmin,
formidable(),
updateProductController
)

// Filter Product
router.post('/product-filters',productFiltersController);

// product-count
router.get('/product-count',productCountController);


// product per page
router.get('/product-list/:page',productPageController);

// search product
router.get("/search/:keyword",searchProductController);

// payments route
// token
router.get('/braintree/token',braintreeTokenController);

// payments
router.post("/braintree/payment",requireSignIn,braintreePaymentsController);


export default router;