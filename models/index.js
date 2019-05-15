import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config.json';
const basename = path.basename (__filename);
const db = {};

let sequelize = new Sequelize (
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

fs
  .readdirSync (__dirname)
  .filter (file => {
    return (
      file.indexOf ('.') !== 0 && file !== basename && file.slice (-3) === '.js'
    );
  })
  .forEach (file => {
    const model = sequelize['import'] (path.join (__dirname, file));
    db[model.name] = model;
  });

Object.keys (db).forEach (modelName => {
  if (db[modelName].associate) {
    db[modelName].associate (db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
