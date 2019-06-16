import userController from "../controllers/userController";
import rimraf from "rimraf";
import fs from "fs";
import config from "../config/config.json";

const updateRouter = {
  async updateUser(req, res) {
    saveUserPhotoInDirectory(
      req.body.id,
      req.body.localPhoto,
      req.body.localPhotoName,
      "user"
    );
    const photo =
      config.domain +
      "/public/images?file=/users/" +
      req.body.id +
      "/avatar/" +
      req.body.localPhotoName;

    let data = req.body;
    delete data.localPhoto;
    delete data.localPhotoName;
    data.photo = photo;
    let user = await userController.update(data);
    res.json(user);
  }
};

export default updateRouter;

export const saveUserPhotoInDirectory = (
  id,
  localPhoto,
  localPhotoName,
  type
) => {
  const routes = `${__dirname}/../public/images/${
    type === "product" ? `products/${id}/image` : `users/${id}/avatar`
  }`;

  fs.mkdirSync(routes, { recursive: true }, err => {});
  fs.writeFileSync(
    routes + "/" + localPhotoName,
    localPhoto.split(";base64,").pop(),
    { encoding: "base64" }
  );
};
