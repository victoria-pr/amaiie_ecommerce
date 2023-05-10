import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
//import { isAuth } from "../utils.js";

const orderRouter = express.Router();

// Ruta para crear una orden
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).send({ message: "No hay productos en la orden." });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).send({ message: "Orden creada.", order: createdOrder });
    }
  })
);

// Ruta para obtener los detalles de una orden por su ID
orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Orden no encontrada." });
    }
  })
);

// Ruta para marcar una orden como pagada
orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();

      res.send({ message: "Orden pagada.", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Orden no encontrada." });
    }
  })
);

// Ruta para obtener las órdenes de un usuario
orderRouter.get(
  "/myorders",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

// Ruta para obtener todas las órdenes (solo para administradores)
orderRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.send(orders);
  })
);

// Ruta para marcar una orden como enviada (solo para administradores)
orderRouter.put(
  "/:id/deliver",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.send({ message: "Orden enviada.", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Orden no encontrada." });
    }
  })
);

export default orderRouter;
