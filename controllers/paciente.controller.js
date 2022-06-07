import Pacientes from "../models/paciente.model.js";

export function getPacientes(req, res, next) {
  Pacientes.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Recibir todos los paciente", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createPaciente(req, res, next) {
  const {
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
  } = req.body;

  Pacientes.create(
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
  )
    .then(res.status(201).json({ success: true, msg: "paciente creado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updatePaciente(req, res, next) {
  const {
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
  } = req.body;
  let id = req.params.id;

  Pacientes.update(
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
    id
  )
    .then(res.status(200).json({ success: true, msg: "paciente actualizado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deletePaciente(req, res, next) {
  let id = req.params.id;

  Pacientes.delete(id)
    .then(res.status(200).json({ success: true, msg: "paciente eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
