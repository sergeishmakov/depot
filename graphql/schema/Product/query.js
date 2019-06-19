import productController from "../../../controllers/productController";

const Query = `
  extend type Query {
    getProducts:[Product]
    getProduct(id: Int!):Product
  }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    getProducts: async () => {
      let products = await productController.getProducts();
      return products;
    },
    getProduct: async (_, { id }) => {
      let product = await productController.getProduct(id);
      return product;
    }
  }
};
