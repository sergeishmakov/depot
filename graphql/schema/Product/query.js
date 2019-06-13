import productController from "../../../controllers/productController";const Query = `  extend type Query {    getProducts:[Product]  }`;export const queryTypes = () => [Query];export const queryResolvers = {  Query: {    getProducts: async () => {      let products = await productController.getProducts();      return products;    }  }};