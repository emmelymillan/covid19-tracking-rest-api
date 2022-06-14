import * as db from "../config/database.config.js";

import Sequelize from "sequelize";
import User from "./user.model.js";
import Role from "./role.model.js";

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
  operatorsAliases: false,
});

const DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.user = User(sequelize, Sequelize);
DB.role = Role(sequelize, Sequelize);

DB.role.hasMany(DB.user, {
  foreignKey: "fk_rol",
});
DB.user.belongsTo(DB.role, {
  foreignKey: "fk_rol",
});

DB.ROLES = ["user", "admin", "moderator"];

export default DB;
