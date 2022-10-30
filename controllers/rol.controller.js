import DB from "../models/index.js";
import sequelize from "sequelize";
import authJwt from "../middleware/authJwt.js";

const Role = DB.role;
const Medico = DB.medico;

export async function list(req, res) {
  const sort = JSON.parse(req.query.sort);
  const range = JSON.parse(req.query.range);
  const filter = JSON.parse(req.query.filter);

  const medicoId = authJwt.obtenerIdPorToken(filter.accessToken);

  const medico = await Medico.findByPk(medicoId);

  if (medico === null) {
    return res.status(401).send("Unautorizado!");
  }

  const rol = await medico
    .getRol()
    .then((role) => {
      return role.nombre;
    })
    .catch(() => {
      return "";
    });

  const count = await Role.count({
    where: rol === "COORDINADOR" && {
      nombre: "MEDICO",
    },
  });

  Role.findAll({
    offset: range[0],
    limit: range[1] - range[0] + 1,
    order: [[sequelize.col(sort[0]), sort[1]]],
    where: rol === "COORDINADOR" && {
      nombre: "MEDICO",
    },
  })
    .then((roles) => {
      res.setHeader("Content-Range", count);
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
