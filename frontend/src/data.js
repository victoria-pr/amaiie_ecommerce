/*import bcrypt from "bcryptjs";*/

const data = {
  users: [
    {
      username: "Basir",
      email: "admin@example.com",
      description: "Basir es un artista de la pintura y la escultura.",
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
      user: "Idoya",
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
      user: "Vicky",
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
      user: "Unai",
      description: "high quality product",
    },
    {
      // _id: '4',
      nameproduct: "bola navidad",
      slug: "bola santa",
      category: "decoration",
      image: "/images/santa1.png",
      price: 65,
      countInStock: 0,
      user: "Unai",
      description: "high quality product",
    },
  ],
};
export default data;
