export function allAccess(req, res) {
  res.status(200).send("Public Content.");
}

export function userBoard(req, res) {
  res.status(200).send("User Content.");
}

export function adminBoard(req, res) {
  res.status(200).send("Admin Content.");
}

export function moderatorBoard(req, res) {
  res.status(200).send("Moderator Content.");
}

import DB from "../models/index.js";
import pkg from "bcryptjs";
import Sequelize from "sequelize";
import sequelize from "sequelize";

const { hashSync } = pkg;

const Op = Sequelize.Op;
const User = DB.user;
const Role = DB.role;

export function list(req, res) {
  const sort = JSON.parse(req.query.sort);

  User.findAll({
    order: [[sequelize.col(sort[0]), sort[1]]],
  })
    .then((users) => {
      res.setHeader("Content-Range", users.length);
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function create(req, res) {
  //  Guardar usuario
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findOne({
          where: {
            nombre: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRol(roles).then(() => {
            res.send({ id: user.id });
          });
        });
      } else {
        // user role = 1
        user.setRol([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function findOne(req, res) {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function update(req, res) {
  User.update(
    {
      activo: req.body.activo,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((user) => {
      res.status(200).json({ id: user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function destroy(req, res) {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
