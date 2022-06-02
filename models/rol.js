import db from "../config/config.js";

const Rol = {};

Rol.create = (nombre, descripcion) => {
  return db.none(`INSERT into rol(nombre, descripcion)` + `VALUES($1, $2)`, [
    nombre,
    descripcion,
  ]);
};

Rol.get = () => {
  return db.any("SELECT * FROM rol");
};

Rol.update = (nombre, descripcion, rolId) => {
  return db.none(`UPDATE rol SET nombre = $1, descripcion = $2 WHERE id = $3`, [
    nombre,
    descripcion,
    rolId,
  ]);
};

Rol.delete = (rolId) => {
  return db.none(`DELETE from rol WHERE id = $1`, rolId);
};

export default Rol;
