import Permiso from "../models/permiso.model.js";

export function getPermisos(req, res, next) {
  Permiso.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Recibir todos los Permiso", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createPermiso(req, res, next) {
  const { nombre, codigo, descripcion } = req.body;

  Permiso.create(nombre, codigo, descripcion)
    .then(res.status(201).json({ success: true, msg: "Permiso creado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updatePermiso(req, res, next) {
  const { nombre, codigo, descripcion } = req.body;
  let id = req.params.id;

  Permiso.update(nombre, codigo, descripcion, id)
    .then(res.status(200).json({ success: true, msg: "Permiso actualizado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deletePermiso(req, res, next) {
  let id = req.params.id;

  Permiso.delete(id)
    .then(res.status(200).json({ success: true, msg: "Permiso eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
