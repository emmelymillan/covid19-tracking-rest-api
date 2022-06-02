import db from "../config/config.js";

const Permiso = {};

Permiso.create = (nombre, codigo, descripcion) => {
  return db.none(
    `INSERT into permiso(nombre, codigo, descripcion)` + `VALUES($1, $2, $3)`,
    [nombre, codigo, descripcion]
  );
};

Permiso.get = () => {
  return db.any("SELECT * FROM permiso");
};

Permiso.update = (nombre, codigo, descripcion, permisoId) => {
  return db.none(
    `UPDATE permiso SET nombre = $1, codigo = $2 descripcion = $3 WHERE id = $4`,
    [nombre, codigo, descripcion, permisoId]
  );
};

Permiso.delete = (permisoId) => {
  return db.none(`DELETE from permiso WHERE id = $1`, permisoId);
};

export default Permiso;
