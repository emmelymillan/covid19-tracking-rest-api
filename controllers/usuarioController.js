// REQUIRE MODEL
import Usuario from "../models/usuario.js";

export function getUsuarios(req, res, next) {
  Usuario.get()
    //.then(data => console.log(data))
    //.then(data => res.render('index', { data }))
    .then((data) =>
      res
        .status(200)
        .json({ title: "Recibir todos los Usuarios", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}
export function createUsuario(req, res, next) {
  // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
  const {
    correo_electronico,
    password,
    fecha_creacion,
    fecha_actualizacion,
    activo,
    fk_medico,
    usuarioId,
  } = req.body;

  Usuario.create(
    correo_electronico,
    password,
    fecha_creacion,
    fecha_actualizacion,
    activo,
    fk_medico,
    usuarioId
  )
    .then(res.status(201).json({ success: true, msg: "Usuario creado" }))
    .catch((err) => res.status(400).json({ err }));
}
export function updateUsuario(req, res, next) {
  // USE BODY PARSER TO EXTRACT DATA FROM CLIENT
  const {
    correo_electronico,
    password,
    fecha_creacion,
    fecha_actualizacion,
    activo,
    fk_medico,
    usuarioId,
  } = req.body;
  // ID OF ARTICLE TO UPDATE
  let id = req.params.id;

  Usuario.update(
    correo_electronico,
    password,
    fecha_creacion,
    fecha_actualizacion,
    activo,
    fk_medico,
    usuarioId,
    id
  )
    .then(res.status(200).json({ success: true, msg: "Usuario actualizado" }))
    .catch((err) => res.status(400).json({ err }));
}
export function deleteUsuario(req, res, next) {
  let id = req.params.id;

  Usuario.delete(id)
    .then(res.status(200).json({ success: true, msg: "Usuario eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
