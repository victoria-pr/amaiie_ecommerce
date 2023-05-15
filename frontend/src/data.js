import bcrypt from 'bcryptjs';

const data = {
  users: [
<<<<<<< HEAD
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
     description: "high quality",
     price: 120,
     countInStock: 10,
     brand: "Idoya",
   },
   {
     //_id: '2',
     nameproduct: "Deco friends",
     slug: "decoracion-friends",
     image: "/images/mueble.png",
     category: "decoration",
     description: "high quality",
     price: 250,
     countInStock: 0,
     brand: "Vicky",
   },
   {
     //_id: '3',
     nameproduct: "Bola Navidad Miki",
     slug: "navidad-miki",
     image: "/images/miki.png",
     category: "decoration",
     description: "high quality product",
     price: 25,
     countInStock: 15,
     brand: "Unai",
   },
   {
     //_id: '4',
     nameproduct: "bola navidad",
     slug: "bola-santa",
     image: "/images/santa1.png",
     category: "decoration",
     description: "high quality product",
     price: 65,
     countInStock: 5,
     brand: "Unai",
   },
 ],
};export default data;



=======
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
      countInStock: 0,
      brand: "Unai",
      description: "high quality product",
    },
  ],
};
export default data;
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
