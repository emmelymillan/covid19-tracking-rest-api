import DB from "../models/index.js";
import sequelize from "sequelize";

const CentroMedico = DB.centroMedico;
const TipoCentroMedico = DB.tipoCentroMedico;

// Listar centros medicos
export function list(req, res) {
  const sort = JSON.parse(req.query.sort);
  CentroMedico.findAll({
    order: [[sequelize.col(sort[0]), sort[1]]],
    include: TipoCentroMedico,
  })
    .then((centrosMedicos) => {
      res.setHeader("Content-Range", centrosMedicos.length);
      res.status(200).send(centrosMedicos);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Guardar centro medico
export function create(req, res) {
  const {
    nombre,
    direccion_latitud,
    direccion_longitud,
    fk_medico,
    fk_tipo_centro_medico,
  } = req.body;

  CentroMedico.create({
    nombre,
    direccion_latitud,
    direccion_longitud,
    fk_medico,
    fk_tipo_centro_medico,
  })
    .then((centroMedico) => {
      res.status(200).json({ id: centroMedico.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Obtener centro medico
export function findOne(req, res) {
  CentroMedico.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((centroMedico) => {
      res.status(200).json(centroMedico);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Actualizar centro medico
export function update(req, res) {
  const {
    nombre,
    direccion_latitud,
    direccion_longitud,
    fk_medico,
    fk_tipo_centro_medico,
  } = req.body;

  CentroMedico.update(
    {
      nombre,
      direccion_latitud,
      direccion_longitud,
      fk_medico,
      fk_tipo_centro_medico,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((centroMedico) => {
      res.status(200).json({ id: centroMedico });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Borrar centro medico
export function destroy(req, res) {
  CentroMedico.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((centroMedico) => {
      res.status(200).json(centroMedico);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
