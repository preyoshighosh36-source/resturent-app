import express from "express";
import {adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

import { addcategory, deletecategory, getAllCategory, updateCategory } from "../controllers/categoryController.js";
const categoryRoutes=express.Router();

categoryRoutes.post("/add",adminOnly,upload.single("image"),addcategory);
categoryRoutes.put("/update/:id",adminOnly,upload.single("image"),updateCategory);
categoryRoutes.delete("/delete/:id",adminOnly,deletecategory);


categoryRoutes.get("/all",getAllCategory);




export default categoryRoutes;