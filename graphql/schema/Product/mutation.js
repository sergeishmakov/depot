import productController from "../../../controllers/productController";
import { saveUserPhotoInDirectory } from "../../../routes/update";
import config from "../../../config/config";

const Mutation = `
  extend type Mutation {
        updateProduct(input: updateProductInput!):Product
        createProduct(input: productInput!):Product
        findProduct(name: String!):String
        deleteProduct(id: Int!):Boolean
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: {
    findProduct: async (_, { name }) => {
      let product = await productController.findByName(name);
      return product;
    },
    updateProduct: async (_, { input }) => {
      console.log(input.localPhoto, input.localPhotoName);
      saveUserPhotoInDirectory(
        input.id,
        input.localPhoto,
        input.localPhotoName,
        "product"
      );
      let data = input;
      const photo =
        config.domain +
        "/public/images?file=/products/" +
        input.id +
        "/image/" +
        input.localPhotoName;
      delete data.localPhoto;
      delete data.localPhotoName;

      data.photo = photo;
      let product = await productController.update(data);
      return product;
    },
    createProduct: async (_, { input }) => {
      let data = input;
      let product = await productController.findOrCreate(data);
      saveUserPhotoInDirectory(
        product.id,
        input.localPhoto,
        input.localPhotoName,
        "product"
      );

      const photo =
        config.domain +
        "/public/images?file=/products/" +
        product.id +
        "/image/" +
        input.localPhotoName;
      product.photo = photo;
      await productController.update({
        id: product.id,
        photo: photo
      });

      return product;
    },
    deleteProduct: async (_, { id }) => {
      let res = await productController.delete({ id: id });
      return res;
    }
  }
};
