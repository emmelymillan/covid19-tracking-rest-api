import DB from "../models/index.js";
import sequelize from "sequelize";

const Medico = DB.medico;

// Listar medicos
export function list(req, res) {
  const sort = JSON.parse(req.query.sort);
  Medico.findAll({
    order: [[sequelize.col(sort[0]), sort[1]]],
  })
    .then((medicos) => {
      res.setHeader("Content-Range", medicos.length);
      res.status(200).send(medicos);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Guardar medico
export function create(req, res) {
  const {
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    es_coordinador,
    especialidad,
    codigo_medico,
  } = req.body;

  Medico.create({
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    es_coordinador,
    especialidad,
    codigo_medico,
  })
    .then((medico) => {
      res.status(200).json({ id: medico.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Obtener medico
export function findOne(req, res) {
  Medico.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((medico) => {
      res.status(200).json(medico);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Actualizar medico
export function update(req, res) {
  const {
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    es_coordinador,
    especialidad,
    codigo_medico,
  } = req.body;

  Medico.update(
    {
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      es_coordinador,
      especialidad,
      codigo_medico,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((medico) => {
      res.status(200).json({ id: medico });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Borrar medico
export function destroy(req, res) {
  Medico.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((medico) => {
      res.status(200).json(medico);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
