// import bcrypt from "bcryptjs";

const data = {
  /* users: [
    {
      name: "Basir",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ], */
  products: [
    {
      // _id: '1',
      nameproduct: "Armario antiguo",
      slug: "armario siglo XI",
      category: "decoration",
      image: "/images/deco.png", // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: "Idoya",
      rating: 4.5,
      numReviews: 10,
      description: "high quality",
    },
    {
      // _id: '2',
      nameproduct: "Deco friends",
      slug: "decoracion friends",
      category: "decoration",
      image: "/images/mueble.png",
      price: 250,
      countInStock: 0,
      brand: "Vicky",
      rating: 4.0,
      numReviews: 10,
      description: "high quality",
    },
    {
      // _id: '3',
      nameproduct: "Bola Navidad Miki",
      slug: "navidad miki",
      category: "decoration",
      image: "/images/miki.png",
      price: 25,
      countInStock: 15,
      brand: "Unai",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      // _id: '4',
      nameproduct: "bola navidad",
      slug: "bola santa",
      category: "decoration",
      image: "/images/santa1.png",
      price: 65,
      countInStock: 5,
      brand: "Unai",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
  ],
};
export default data;
