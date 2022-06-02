import db from "../config/config.js";

const CentroMedico = {};

CentroMedico.create = (
  nombre,
  fk_medico,
  fk_parroquia,
  fk_tipo_centro_medico
) => {
  return db.none(
    `INSERT into centro_medico(nombre, fk_medico, fk_parroquia, fk_tipo_centro_medico)` +
      `VALUES($1, $2, $3, $4)`,
    [nombre, fk_medico, fk_parroquia, fk_tipo_centro_medico]
  );
};

CentroMedico.get = () => {
  return db.any("SELECT * FROM centro_medico");
};

CentroMedico.update = (
  nombre,
  fk_medico,
  fk_parroquia,
  fk_tipo_centro_medico,
  centroMedicoId
) => {
  return db.none(
    `UPDATE centro_medico SET nombre = $1, fk_medico = $2, fk_parroquia = $3, fk_tipo_centro_medico = $4 WHERE id = $5`,
    [nombre, fk_medico, fk_parroquia, fk_tipo_centro_medico, centroMedicoId]
  );
};

CentroMedico.delete = (centroMedicoId) => {
  return db.none(`DELETE from centro_medico WHERE id = $1`, centroMedicoId);
};

export default CentroMedico;
