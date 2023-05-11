import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
//import { isAuth } from "../utils.js";

const orderRouter = express.Router();

// Ruta para crear una orden
orderRouter.post(
  "/",
  //isAuth,

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

  //isAuth,

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

  //isAuth,

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

  //isAuth,

  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

// Ruta para obtener todas las órdenes (solo para administradores)
orderRouter.get(
  "/",

  //isAuth,

  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.send(orders);
  })
);

// Ruta para actualizar una orden por su ID
orderRouter.put(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.findById(orderId);

    if (order) {
      order.orderItems = orderItems;
      order.shippingAddress = shippingAddress;
      order.paymentMethod = paymentMethod;
      order.itemsPrice = itemsPrice;
      order.taxPrice = taxPrice;
      order.shippingPrice = shippingPrice;
      order.totalPrice = totalPrice;

      const updatedOrder = await order.save();

      res.send({ message: "Orden actualizada.", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Orden no encontrada." });
    }
  })
);

// Ruta para eliminar una orden por su ID
orderRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (order) {
      const deletedOrder = await order.remove();
      res.send({ message: "Orden eliminada.", order: deletedOrder });
    } else {
      res.status(404).send({ message: "Orden no encontrada." });
    }
  })
);

// Ruta para marcar una orden como enviada (solo para administradores)
orderRouter.put(
  "/:id/deliver",

  //isAuth,

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

/* import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin, mailgun, payOrderEmailTemplate } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
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

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: 'Order Delivered' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );
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
      mailgun()
        .messages()
        .send(
          {
            from: 'Amazona <amazona@mg.yourdomain.com>',
            to: `${order.user.name} <${order.user.email}>`,
            subject: `New order ${order._id}`,
            html: payOrderEmailTemplate(order),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );

      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: 'Order Deleted' });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter; */
