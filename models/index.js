import * as db from "../config/database.config.js";

import Sequelize from "sequelize";
import Role from "./role.model.js";
import CentroMedico from "./centroMedico.model.js";
import Medico from "./medico.model.js";
import TipoCentroMedico from "./tipoCentroMedico.model.js";
import Sintoma from "./sintoma.model.js";
import Paciente from "./paciente.model.js";
import Caso from "./caso.model.js";

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
DB.paciente = Paciente(sequelize, Sequelize);
DB.sintoma = Sintoma(sequelize, Sequelize);
DB.caso = Caso(sequelize, Sequelize);

// Relación de medicos y roles
DB.role.hasMany(DB.medico, {
  foreignKey: "fk_rol",
});
DB.medico.belongsTo(DB.role, {
  foreignKey: "fk_rol",
});

// Relación de centros pacientes y casos
DB.paciente.hasMany(DB.caso, {
  foreignKey: "fk_paciente",
});
DB.caso.belongsTo(DB.paciente, {
  foreignKey: "fk_paciente",
});

// Relación de medicos y casos
DB.medico.hasMany(DB.caso, {
  foreignKey: "fk_medico",
});
DB.caso.belongsTo(DB.medico, {
  foreignKey: "fk_medico",
});

// Relación de centros medicos y casos
DB.centroMedico.hasMany(DB.caso, {
  foreignKey: "fk_centro_medico",
});
DB.caso.belongsTo(DB.centroMedico, {
  foreignKey: "fk_centro_medico",
});

// Relación de medico y centros medicos (cambiar)
DB.medico.hasOne(DB.centroMedico, {
  foreignKey: "fk_medico",
});

// Relación de tipos de centros medicos y centros medicos
DB.tipoCentroMedico.hasMany(DB.centroMedico, {
  foreignKey: "fk_tipo_centro_medico",
});
DB.centroMedico.belongsTo(DB.tipoCentroMedico, {
  foreignKey: "fk_tipo_centro_medico",
});

// Relación de pacientes y sintomas
DB.paciente.belongsToMany(DB.sintoma, {
  through: "paciente_sintoma",
  as: "sintomas",
  foreignKey: "fk_paciente",
});
DB.sintoma.belongsToMany(DB.paciente, {
  through: "paciente_sintoma",
  as: "pacientes",
  foreignKey: "fk_sintoma",
});

export default DB;
