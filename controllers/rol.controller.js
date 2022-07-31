import DB from "../models/index.js";
import sequelize from "sequelize";

const Role = DB.role;

export function list(req, res) {
  const sort = JSON.parse(req.query.sort);

  Role.findAll({
    order: [[sequelize.col(sort[0]), sort[1]]],
  })
    .then((roles) => {
      res.setHeader("Content-Range", roles.length);
      res.status(200).send(roles);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function create(req, res) {
  //  Guardar rol
  Role.create({
    nombre: req.body.nombre.toUpperCase(),
    descripcion: req.body.descripcion,
  })
    .then((rol) => {
      res.status(200).json({ id: rol.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function findOne(req, res) {
  Role.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((rol) => {
      res.status(200).json(rol);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function update(req, res) {
  Role.update(
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((rol) => {
      res.status(200).json({ id: rol });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function destroy(req, res) {
  Role.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((rol) => {
      res.status(200).json(rol);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
