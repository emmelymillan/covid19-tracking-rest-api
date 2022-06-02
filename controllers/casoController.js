import Caso from "../models/caso.js";

export function getCasos(req, res, next) {
  Caso.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Recibir todos los casos", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createCaso(req, res, next) {
  const {
    estado,
    fecha_ingreso,
    fecha_recuperacion,
    fecha_fallecimiento,
    fk_medico,
    fk_paciente,
    fk_centro_medico,
  } = req.body;

  Caso.create(
    estado,
    fecha_ingreso,
    fecha_recuperacion,
    fecha_fallecimiento,
    fk_medico,
    fk_paciente,
    fk_centro_medico
  )
    .then(res.status(201).json({ success: true, msg: "Caso creado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateCaso(req, res, next) {
  const {
    estado,
    fecha_ingreso,
    fecha_recuperacion,
    fecha_fallecimiento,
    fk_medico,
    fk_paciente,
    fk_centro_medico,
  } = req.body;
  let id = req.params.id;

  Caso.update(
    estado,
    fecha_ingreso,
    fecha_recuperacion,
    fecha_fallecimiento,
    fk_medico,
    fk_paciente,
    fk_centro_medico,
    id
  )
    .then(res.status(200).json({ success: true, msg: "Caso actualizado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deleteCaso(req, res, next) {
  let id = req.params.id;

  Caso.delete(id)
    .then(res.status(200).json({ success: true, msg: "Caso eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
