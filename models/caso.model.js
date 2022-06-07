import db from "../config/config.js";

const Caso = {};

Caso.create = (
  estado,
  fecha_ingreso,
  fecha_recuperacion,
  fecha_fallecimiento,
  fk_medico,
  fk_paciente,
  fk_centro_medico
) => {
  return db.none(
    `INSERT into caso(estado, fecha_ingreso, fecha_recuperacion, fecha_fallecimiento, fk_medico, fk_paciente, fk_centro_medico)` +
      `VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [
      estado,
      fecha_ingreso,
      fecha_recuperacion,
      fecha_fallecimiento,
      fk_medico,
      fk_paciente,
      fk_centro_medico,
    ]
  );
};

Caso.get = () => {
  return db.any("SELECT * FROM caso");
};

Caso.update = (
  estado,
  fecha_ingreso,
  fecha_recuperacion,
  fecha_fallecimiento,
  fk_medico,
  fk_paciente,
  fk_centro_medico,
  casoId
) => {
  return db.none(
    `UPDATE caso SET estado = $1, fecha_ingreso = $2, fecha_recuperacion = $3, fecha_fallecimiento = $4, fk_medico = $5, fk_paciente = $6, fk_centro_medico = $7 WHERE id = $8`,
    [
      estado,
      fecha_ingreso,
      fecha_recuperacion,
      fecha_fallecimiento,
      fk_medico,
      fk_paciente,
      fk_centro_medico,
      casoId,
    ]
  );
};

Caso.delete = (casoId) => {
  return db.none(`DELETE from caso WHERE id = $1`, casoId);
};

export default Caso;
