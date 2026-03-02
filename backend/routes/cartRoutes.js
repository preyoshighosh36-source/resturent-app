import express from "express";
import {adminOnly,protect } from "../middlewares/authMiddleware.js";
import { addToCart, removeFromcart,getCart } from "../controllers/cartController.js";

const cartRoutes=express.Router();
cartRoutes.post("/add",protect,addToCart);
cartRoutes.get("/get",protect,getCart);
cartRoutes.delete("/remove",protect,removeFromcart);


export default cartRoutes;