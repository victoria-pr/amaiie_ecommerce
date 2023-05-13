
import bcrypt from 'bcryptjs';


const data = {
   users: [
    {
      username: "Basir",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true
    },
    {
      username: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false
    },
  ],
  products: [
    {

      //_id: '1',
      nameproduct: "Armario antiguo", 
      slug: "armario-siglo-XI",
      image: "/images/deco.png", // 679px × 829px
      category: "decoration",
      countInStock: 2,
      description: "high quality",
      price: 120,
      brand: "Idoya",

    },
    {
      //_id: '2',
      nameproduct: "Deco friends",
      slug: "decoracion-friends",
      image: "/images/mueble.png",
      category: "decoration",
      countInStock: 2,
      description: "high quality",
      price: 250,
      brand: "Vicky",

    },
    {
      //_id: '3',
      nameproduct: "Bola Navidad Miki",
      slug: "navidad-miki",
      image: "/images/miki.png",
      category: "decoration",
      countInStock: 2,
      description: "high quality product",
      price: 25,
      brand: "Unai",
    },
    {
      //_id: '4',
      nameproduct: "bola navidad",

      slug: "bola-santa",
      image: "/images/santa1.png",
      category: "decoration",
      countInStock: 0,
      description: "high quality product",

      price: 65,
      brand: "Unai",

    },
  ],
};


export default data;

