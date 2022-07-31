import DB from "../models/index.js";
import sequelize from "sequelize";

const Sintoma = DB.sintoma;

export function list(req, res, next) {
  // const sort = JSON.parse(req.query.sort);

  Sintoma.findAll()
    .then((sintomas) => {
      res.setHeader("Content-Range", sintomas.length);
      res.status(200).send(sintomas);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function create(req, res) {
  Sintoma.create({
    nombre: req.body.nombre,
  })
    .then((sintoma) => {
      res.status(200).json({ id: sintoma.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function findOne(req, res) {
  Sintoma.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((sintoma) => {
      res.status(200).json(sintoma);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function update(req, res) {
  Sintoma.update(
    {
      nombre: req.body.nombre,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((sintoma) => {
      res.status(200).json({ id: sintoma });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function destroy(req, res) {
  Sintoma.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((sintoma) => {
      res.status(200).json(sintoma);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
