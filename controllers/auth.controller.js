import DB from "../models/index.js";
import Sequelize from "sequelize";
import { secret } from "../config/auth.config.js";
import pkgJwt from "jsonwebtoken";
import pkg from "bcryptjs";

const { sign } = pkgJwt;
const { hashSync, compareSync } = pkg;
const Op = Sequelize.Op;
const User = DB.user;
const Role = DB.role;

export function signup(req, res) {
  // Save User to Database
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
            res.send({ message: "User was registered successfully!" });
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

export function signin(req, res) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      user.getRol().then((rol) => {
        console.log("Im here", rol.nombre);

        authorities.push("ROLE_" + rol.nombre.toUpperCase());

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
