/*import bcrypt from "bcryptjs";*/

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
  ],*/
  products: [
    {
      // _id: '1',
      name: "Bola de Navidad n1",
      slug: "bola-navidad",
      category: "decoration",
      image: "/images/bola.png",
      price: 25,
      idartist: "Unai Designer",
      createdate: " 05/11/2022",
      description: "Bola de Navidad handmade",
    },
    {
      // _id: '2',
      name: "Portallaves",
      slug: "portallaves",
      category: "miniatures",
      image: "/images/deco.png",
      price: 75,
      idartist: "Vicky Designer",
      createdate: "13/02/2023",
      description: "Portallaves diseño personalizado",
    },
    {
      // _id: '3',
      name: "Jabon Natural",
      slug: "jabon-natural",
      category: "soaps and candels",
      image: "/images/jabon.png",
      price: 10,
      idartist: "Jabijabones",
      createdate: "05/05/2023",
      description: "Jabon Natural artesanal",
    },
    {
      // _id: '4',
      name: "Vitrina de caoba lacada",
      slug: "vitrina-lacada",
      category: "decoration",
      image: "/images/mueble.png",
      price: 650,
      idartist: "igedeko",
      createdate: "14/12/2022",
      description: "Vitrina anticuario lacada",
    },
  ],
};
export default data;
