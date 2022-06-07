import db from "../config/config.js";

const Paciente = {};

Paciente.create = (
  nombres,
  apellidos,
  tipo_documento,
  nro_documento,
  fecha_nacimiento,
  genero,
  nro_telefono,
  direccion_latitud,
  direccion_longitud,
  antecedentes_medicos
) => {
  return db.none(
    `INSERT into paciente(nombres, apellidos, tipo_documento, nro_documento, fecha_nacimiento, genero, nro_telefono, direccion_latitud, direccion_longitud, antecedentes_medicos)` +
      `VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      fecha_nacimiento,
      genero,
      nro_telefono,
      direccion_latitud,
      direccion_longitud,
      antecedentes_medicos,
    ]
  );
};

Paciente.get = () => {
  return db.any("SELECT * FROM paciente");
};

Paciente.update = (
  nombres,
  apellidos,
  tipo_documento,
  nro_documento,
  fecha_nacimiento,
  genero,
  nro_telefono,
  direccion_latitud,
  direccion_longitud,
  antecedentes_medicos,
  pacienteId
) => {
  return db.none(
    `UPDATE paciente SET nombres = $1, apellidos = $2, tipo_documento = $3, nro_documento = $4, fecha_nacimiento = $5, genero = $6, nro_telefono = $7, direccion_latitud = $8, direccion_longitud = $9, antecedentes_medicos = $10 WHERE id = $11`,
    [
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      fecha_nacimiento,
      genero,
      nro_telefono,
      direccion_latitud,
      direccion_longitud,
      antecedentes_medicos,
      pacienteId,
    ]
  );
};

Paciente.delete = (pacienteId) => {
  return db.none(`DELETE from paciente WHERE id = $1`, pacienteId);
};

export default Paciente;
