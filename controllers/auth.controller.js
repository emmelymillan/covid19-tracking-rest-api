import DB from "../models/index.js";
import { secret } from "../config/auth.config.js";
import pkgJwt from "jsonwebtoken";
import pkg from "bcryptjs";

const { sign } = pkgJwt;
const { compareSync } = pkg;
const Medico = DB.medico;

export function signin(req, res) {
  Medico.findOne({
    where: {
      correo: req.body.correo,
    },
  })
    .then((medico) => {
      if (!medico) {
        return res.status(404).send({ message: "Medico no encontrado." });
      }

      var passwordIsValid = compareSync(req.body.clave, medico.clave);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Datos incorrectos.",
        });
      }

      var token = sign({ id: medico.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      medico.getRol().then((rol) => {
        res.status(200).send({
          id: medico.id,
          correo: medico.correo,
          nombre: medico.nombres + " " + medico.apellidos,
          coordinador: medico.es_coordinador,
          activo: medico.activo,
          rol: "ROLE_" + rol.nombre.toUpperCase(),
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
