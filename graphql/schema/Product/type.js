const Product = `
type Product {
  id: Int
  name: String
  instock: Int
  localPhoto: String
  localPhotoName: String
  category: String
  date: String
  model: String
  firm: String
  description: String
  price: Int!
  photo: String
}
`;

export const types = () => [Product];

export const typeResolvers = {};
