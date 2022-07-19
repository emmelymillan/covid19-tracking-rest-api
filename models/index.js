import * as db from "../config/database.config.js";

import Sequelize from "sequelize";
import Role from "./role.model.js";
import CentroMedico from "./centroMedico.model.js";
import Medico from "./medico.model.js";
import TipoCentroMedico from "./tipoCentroMedico.model.js";

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
  operatorsAliases: false,
});

const DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

DB.role = Role(sequelize, Sequelize);
DB.medico = Medico(sequelize, Sequelize);
DB.tipoCentroMedico = TipoCentroMedico(sequelize, Sequelize);
DB.centroMedico = CentroMedico(sequelize, Sequelize);

DB.role.hasMany(DB.medico, {
  foreignKey: "fk_rol",
});
DB.medico.belongsTo(DB.role, {
  foreignKey: "fk_rol",
});

DB.medico.hasOne(DB.centroMedico, {
  foreignKey: "fk_medico",
});

DB.tipoCentroMedico.hasMany(DB.centroMedico, {
  foreignKey: "fk_tipo_centro_medico",
});
DB.centroMedico.belongsTo(DB.tipoCentroMedico, {
  foreignKey: "fk_tipo_centro_medico",
});

export default DB;
