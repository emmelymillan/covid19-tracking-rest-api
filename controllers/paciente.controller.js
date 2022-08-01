import DB from "../models/index.js";
import sequelize from "sequelize";

const Paciente = DB.paciente;

export function list(req, res) {
  // const sort = JSON.parse(req.query.sort);

  Paciente.findAll({
    // order: [[sequelize.col(sort[0]), sort[1]]],
  })
    .then((pacientes) => {
      res.setHeader("Content-Range", pacientes.length);
      res.status(200).send(pacientes);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function findOne(req, res) {
  Paciente.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((paciente) => {
      res.status(200).json(paciente);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function create(req, res) {
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
    // antecedentes_medicos,
  } = req.body;

  Paciente.create({
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    fecha_nacimiento,
    genero,
    nro_telefono,
    direccion_latitud,
    direccion_longitud,
    // antecedentes_medicos
  })
    .then((paciente) => {
      res.status(200).json({ id: paciente.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
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

  Paciente.update(
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
