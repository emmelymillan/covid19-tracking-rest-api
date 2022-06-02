import db from "../config/config.js";

const Usuario = {};

Usuario.create = (
  correo_electronico,
  password,
  fecha_creacion,
  fecha_actualizacion,
  activo,
  fk_medico
) => {
  return db.none(
    `INSERT into usuario(correo_electronico, password, fecha_creacion, fecha_actualizacion, activo, fk_medico)` +
      `VALUES($1, $2, $3, $4, $5, $6)`,
    [
      correo_electronico,
      password,
      fecha_creacion,
      fecha_actualizacion,
      activo,
      fk_medico,
    ]
  );
};

Usuario.get = () => {
  return db.any("SELECT * FROM usuario");
};

Usuario.update = (
  correo_electronico,
  password,
  fecha_creacion,
  fecha_actualizacion,
  activo,
  fk_medico,
  usuarioId
) => {
  return db.none(
    `UPDATE usuario SET correo_electronico = $1, password = $2, fecha_creacion = $3, fecha_actualizacion = $4, activo = $5, fk_medico $6 WHERE id = $7`,
    [
      correo_electronico,
      password,
      fecha_creacion,
      fecha_actualizacion,
      activo,
      fk_medico,
      usuarioId,
    ]
  );
};

Usuario.delete = (usuarioId) => {
  return db.none(`DELETE from usuario WHERE id = $1`, usuarioId);
};

export default Usuario;
