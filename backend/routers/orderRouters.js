import express from "express";
//middleware de Express que facilita la gestión de errores asincrónicos en controladores de rutas
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
//Enrutador de los pedidos de la web
const orderRouter = express.Router();
//FUNCION POST: Para la creación de un nuevo pedido
orderRouter.post(
  "/",
  isAuth, //autentificación
  //Objeto con los datos del pedido

  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    //Guardamos el pedido en la base de datos
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);
//FUNCION GET: Para obtener los pedidos del usuario autentificado con un id específico

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders); //envía los pedidos del usuario con un id específico
  })
);
//FUNCION GET: Para obtener un pedido con un id de pedido específico y único

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

// Ruta para marcar una orden como pagada
orderRouter.put(
  "/:id/pay",

  //isAuth,

  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    //Si se encuentra el pedido, se actualiza su estado de pago y se guarda en la base de datos

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      //guarda el estado de pago en la base de datos

      const updatedOrder = await order.save();

      res.send({ message: "Orden pagada.", order: updatedOrder });
    } else {
      //Si no encuentra el pedido, manda un mensaje de error

      res.status(404).send({ message: "Orden no encontrada." });
    }
  })
);

export default orderRouter;
