import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: { $eq: req.params.slug } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;

/*import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//import { isAuth,isAdmin} from "../utils.js";

//Función Router de Express para manejar las rutas relacionadas con producto
const productRouter = express.Router();
productRouter.get("/", async (req, res) => {
  //para buscar los productos
  const products = await Product.find();
  res.send(products); //muestra los productos en formato JSON
});

//Ruta POST para crear un nuevo producto
productRouter.post(
  "/",
  //isAuth,
  //isAdmin,
  //isArtist,

  //Función del controlador asíncrona que garantiza que las respuestas sean devueltas correctamente
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      nameproduct: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/sample-image.png",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      description: "sample description",
    });
    //Guardamos el producto en la base de datos  para enviar posteriormente un mensaje de que el producto se ha creado
    const product = await newProduct.save();
    res.send({ message: "Product Created", product });
  })
);

//Ruta PUT que actualiza los productos con identificador id
productRouter.put(
  "/:id",
  //isAuth,
  //isAdmin,
  //isArtist,
  //para manejar de manera asíncrona la función del controlador para la ruta PUT
  expressAsyncHandler(async (req, res) => {
    //identificamos el producto específico por su id
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.nameproduct = req.body.nameproduct;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      //Una vez actualizado el producto se guarda y envía la respuesta de producto actualizado o en su caso de producto no encontrado
      await product.save();
      res.send({ message: "Product Updated" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//Ruta DELETE que elimina un producto según su identificador
productRouter.delete(
  "/:id",
  //isAuth,
  //isAdmin,
  //isArtist,

  //función asíncrona del controlador para la ruta DELETE
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
/*productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })

);*/ 
/*
// Ruta GET que obtiene la lista de productos
const PAGE_SIZE = 3; //elementos que se muestran por página

productRouter.get(
  "/admin",
  //isAuth,
  //isAdmin,
  //isArtist,
  //función asíncrona para manejar la función del controlador para la ruta GET
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1; //página actual por defecto
    const pageSize = query.pageSize || PAGE_SIZE;
    const products = await Product.find()
      .skip(pageSize * (page - 1)) //para omitir los productos de páginas anteriores
      .limit(pageSize); //limita el número de productos devueltos según el tamaño de la página
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize), //objeto JSON con los productos, número página actual y número total de páginas
    });
  })
);
//BUSCADOR DE PRODUCTOS: con filtros por nombre, categoría, rating y precio
productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const order = query.order || "";
    const searchQuery = query.query || "";
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            nameproduct: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    /* const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? /*  ? { rating: -1 }
        : order === "newest" 
          { createdAt: -1 }
        : { _id: -1 };
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,

      /*...ratingFilter,*//*
    })  /*

      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,

      /*...ratingFilter,*//*
  }); /*

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

//ruta GET para acceder a través de las categorías
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories); //lista de categorías en formato JSON
  })
);
//ruta GET para acceder a través del slug
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
//ruta GET para acceder a través del id
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});


export default productRouter;*/

