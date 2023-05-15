/*import bcrypt from "bcryptjs";*/

const data = {
  users: [
    {
      username: "Basir",
      email: "admin@example.com",

      password: "123456",
      isAdmin: true,

      /* password: bcrypt.hashSync("123456"),
      role: admin, */
    },
    {
      username: "John",
      email: "user@example.com",
      //password: bcrypt.hashSync("123456"),
      //role: user,
    },
  ],
  products: [
    {
      // _id: '1',
      nameproduct: "Armario antiguo",
      slug: "armario siglo XI",
      category: "decoration",
      image: "/images/deco.png", // 679px × 829px
      price: 120,
      countInStock: 2,
      brand: "Idoya",
      description: "high quality",
    },
    {
      // _id: '2',
      nameproduct: "Deco friends",
      slug: "decoracion friends",
      category: "decoration",
      image: "/images/mueble.png",
      price: 250,
      countInStock: 2,
      brand: "Vicky",
      description: "high quality",
    },
    {
      // _id: '3',
      nameproduct: "Bola Navidad Miki",
      slug: "navidad miki",
      category: "decoration",
      image: "/images/miki.png",
      price: 25,
      countInStock: 2,
      brand: "Unai",
      description: "high quality product",
    },
    {
      // _id: '4',
      nameproduct: "bola navidad",
      slug: "bola santa",
      category: "decoration",
      image: "/images/santa1.png",
      price: 65,
      countInStock: 1,
      brand: "Unai",
      description: "high quality product",
    },
    {
      // _id: '5',
      nameproduct: "zapatillas pintura",
      slug: "zapatillas",
      category: "pintura",
      image: "/images/zapatillas.png",
      price: 65,
      countInStock: 1,
      brand: "Marta",
      description: "Design shoes",
    },
    {
      // _id: '5',
      nameproduct: "Pulseras de oro",
      slug: "pulseras",
      category: "joyeria",
      image: "/images/pulseras.png",
      price: 70,
      countInStock: 2,
      brand: "María",
      description: "Joyas de diseño",
    },
  ],
};
export default data;
