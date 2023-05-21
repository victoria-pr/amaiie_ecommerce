import mongoose from "mongoose";
//Esquema para la estructura de datos de los pedidos que se almacenan en MongoDB

const orderSchema = new mongoose.Schema(
  {
    //Objeto con los elementos del pedido
    orderItems: [
      {
        slug: { type: String, required: true },
        nameproduct: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        user: { type: String, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: false,
        },
      },
    ],
    //Objeto con los elementos del envío
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: false },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    //Objeto con los métodos de pago
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    //Objeto con los precios (producto, envío, impuestos y total)
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //Objeto con los estados de pago y envío
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    //para que mongoose cree la fecha actualizada de creación y actualización de datos
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order; //lo esportamos para utilizarlo en otros archivos
