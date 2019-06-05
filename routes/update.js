import userController from "../controllers/userController";
import rimraf from "rimraf";
import fs from "fs";
import config from "../config/config.json";

const updateRouter = {
  async updateUser(req, res) {
    saveUserPhotoiInDirectory(
      req.body.id,
      req.body.localPhoto,
      req.body.localPhotoName
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

const saveUserPhotoiInDirectory = (id, localPhoto, localPhotoName) => {
  const routes = __dirname + "/../public/images/users/" + id + "/avatar";
  rimraf.sync(routes);
  fs.mkdirSync(routes, { recursive: true }, err => {});
  fs.writeFileSync(
    routes + "/" + localPhotoName,
    localPhoto.split(";base64,").pop(),
    { encoding: "base64" }
  );
};
