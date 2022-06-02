import db from "../config/config.js";

const Medico = {};

Medico.create = (
  nombres,
  apellidos,
  tipo_documento,
  nro_documento,
  es_coordinador,
  especialidad,
  codigo_medico
) => {
  return db.none(
    `INSERT into medico(nombres, apellidos, tipo_documento, nro_documento, es_coordinador, especialidad, codigo_medico)` +
      `VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      es_coordinador,
      especialidad,
      codigo_medico,
    ]
  );
};

Medico.get = () => {
  return db.any("SELECT * FROM medico");
};

Medico.update = (
  nombres,
  apellidos,
  tipo_documento,
  nro_documento,
  es_coordinador,
  especialidad,
  codigo_medico,
  MedicoId
) => {
  return db.none(
    `UPDATE medico SET nombres = $1, apellidos = $2, tipo_documento = $3, nro_documento = $4, es_coordinador = $5, especialidad = $6, codigo_medico = $7 WHERE id = $8`,
    [
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      es_coordinador,
      especialidad,
      codigo_medico,
      MedicoId,
    ]
  );
};

Medico.delete = (MedicoId) => {
  return db.none(`DELETE from medico WHERE id = $1`, MedicoId);
};

export default Medico;
