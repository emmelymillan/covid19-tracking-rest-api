import Rol from "../models/rol.js";

export function getRoles(req, res, next) {
  Rol.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Retreived all Roles", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createRole(req, res, next) {
  const { name, description } = req.body;

  Rol.create(name, description)
    .then(res.status(201).json({ success: true, msg: "Role Created" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateRole(req, res, next) {
  const { name, description } = req.body;
  let id = req.params.id;

  Rol.update(name, description, id)
    .then(res.status(200).json({ success: true, msg: "Role Updated" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deleteRole(req, res, next) {
  let id = req.params.id;

  Rol.delete(id)
    .then(res.status(200).json({ success: true, msg: "Role Deleted" }))
    .catch((err) => res.status(400).json({ err }));
}
