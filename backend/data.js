import bcrypt from 'bcryptjs';

const data = {
   users: [
    {
      username: "user",
      email: "user@example.com",
      password: bcrypt.hashSync("123"),
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
      description: "Vicky es una talentosa artista de 31 años con una pasión innata por las manualidades. Su creatividad y habilidades artísticas le permiten crear piezas únicas y diferentes que cautivan a todos los que las ven. Con su dedicación y amor por su oficio, se ha convertido en una exitosa emprendedora en el mundo de las manualidades.  Desde temprana edad, Vicky mostró un gran interés por las artes y la creación. Siempre estaba experimentando con diferentes materiales y técnicas, explorando nuevas formas de expresar su imaginación. A lo largo de los años, ha perfeccionado su técnica y ha desarrollado un estilo distintivo que combina elementos tradicionales y contemporáneos.  Vicky se especializa en la creación de manualidades únicas que tienen un enfoque moderno y estético. Utiliza una amplia variedad de materiales, desde papel y tela hasta arcilla y metales, para crear piezas verdaderamente sorprendentes. Sus obras abarcan desde joyería artesanal y accesorios hasta decoración del hogar y regalos personalizados.",
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
      user: "vicky",
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
      user: "idoya",
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
      user: "unai",
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
      user: "unai",
    },
  ],
}; 

export default data;
