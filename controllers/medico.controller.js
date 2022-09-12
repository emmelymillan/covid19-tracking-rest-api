import DB from "../models/index.js";
import Sequelize from "sequelize";
import sequelize from "sequelize";
import pkg from "bcryptjs";

const { hashSync } = pkg;
const Op = Sequelize.Op;
const Medico = DB.medico;
const Role = DB.role;

// Listar medicos
export async function list(req, res) {
  const sort = JSON.parse(req.query.sort);
  const range = JSON.parse(req.query.range);

  const count = await Medico.count();

  Medico.findAll({
    offset: range[0],
    limit: range[1] - range[0] + 1,
    order: [[sequelize.col(sort[0]), sort[1]]],
    include: Role,
  })
    .then((medicos) => {
      res.setHeader("Content-Range", count);
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
    correo,
    clave,
    rol,
  } = req.body;

  Medico.create({
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    es_coordinador,
    especialidad,
    codigo_medico,
    correo,
    clave: hashSync(clave, 8),
    rol,
  })
    .then((medico) => {
      if (rol) {
        Role.findOne({
          where: {
            nombre: rol,
          },
        }).then((roles) => {
          medico.setRol(roles).then(() => {
            res.status(200).json({ id: medico.id });
          });
        });
      } else {
        // medico con rol 1
        medico.setRol(1).then(() => {
          res.send({ message: "Médico registrado exitosamente!" });
        });
      }
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
    activo,
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
      activo,
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
