const express = require("express");
const Authentication = require("../Middleware/authentication");
const CART = require("../Schema/cart.schema");
const cartController = express.Router();

cartController.get("/", async (req, res) => {
  // const { id } = req.params;

  const items = await CART.find();

  res.status(200).send(items);
});

cartController.delete("/delete/:id" ,async (req, res) => {
  const { id } = req.params;

  const deletedData = await CART.deleteOne({ _id: id });

  res.status(200).send("deleted");
});

cartController.patch("/:id/edit",async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {UserId, size, quantity } = req.body;
  // const item = await CART.findOne({ _id: id });
  // console.log(item);
  const updated_product = await CART.findOneAndUpdate(
    { _id: id },
    { size: size, quantity: quantity },
    { new: true }
  );
  
  const finalData = await CART.find({UserId:UserId})

  return res.status(200).send(finalData);
});

cartController.post("/create",async (req, res) => {
  const { productName, Image, price, size, color, quantity, UserId } = req.body;
  const data = await CART.create({
    productName,
    Image,
    price,
    size,
    color,
    quantity,
    UserId,
  });
  return res.status(200).send({ message: "Item addeed", cart: data });
});

module.exports = cartController;
