import Rol from "../models/rol.js";

export function getRoles(req, res, next) {
  Rol.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Recibir todos los Roles", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createRole(req, res, next) {
  const { nombre, descripcion } = req.body;

  Rol.create(nombre, descripcion)
    .then(res.status(201).json({ success: true, msg: "Role creado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateRole(req, res, next) {
  const { nombre, descripcion } = req.body;
  let id = req.params.id;

  Rol.update(nombre, descripcion, id)
    .then(res.status(200).json({ success: true, msg: "Role actualizado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deleteRole(req, res, next) {
  let id = req.params.id;

  Rol.delete(id)
    .then(res.status(200).json({ success: true, msg: "Role eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
