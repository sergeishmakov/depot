const Input = `
input productInput {
  name: String
  instock: Int
  localPhoto: String!
  localPhotoName: String!
  firm: String
  category: String
  date: String
  model: String
  description: String
  price: Int
}
input updateProductInput {
  id: Int
  name: String
  instock: Int
  localPhoto: String
  localPhotoName: String
  firm: String
  category: String
  date: String
  model: String
  description: String
  price: Int
}
`;

export default () => [Input];
