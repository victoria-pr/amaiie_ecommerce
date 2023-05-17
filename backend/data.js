import bcrypt from 'bcryptjs';

const data = {
   users: [
    {
      username: "user",
      email: "user@example.com",
      password: bcrypt.hashSync("123"),
      description: "Basir es un artista de la pintura y la escultura.",
      isAdmin: false
    },
    {
      username: "admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("123"),
      isAdmin: true
    },
    {
      username: "vicky",
      email: "artist@example.com",
      password: bcrypt.hashSync("123"),
      isAdmin: false,
      isArtist: true
    },
  ],
  products: [ 
    {
      //_id: '1',
      nameproduct: "Deco friends", 
      slug: "decoracion-friends",
      image: "/images/deco.png", // 679px × 829px
      category: "decoration",
      description: "high quality",
      price: 120,
      countInStock: 10,
      brand: "vicky",
    },
    {
      //_id: '2',
      nameproduct: "Armario antiguo",
      slug: "armario-siglo-XI",
      image: "/images/mueble.png",
      category: "decoration",
      description: "high quality",
      price: 250,
      countInStock: 0,
      brand: "idoya",
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
      brand: "unai",
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
      brand: "unai",
    },
  ],
};

export default data;
