import { secret } from "../config/auth.config.js";
import DB from "../models/index.js";
import pkg from "jsonwebtoken";

const User = DB.user;
const { verify } = pkg;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRol().then((rol) => {
      if (rol.nombre === "admin") {
        next();
        return;
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user) {
      user.getRol().then((rol) => {
        if (rol.nombre === "moderator") {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Moderator Role!",
        });
      });
    }
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRol().then((rol) => {
      if (rol.nombre === "moderator" || rol.nombre === "admin") {
        next();
        return;
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};

export default authJwt;
