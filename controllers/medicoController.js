import Medico from "../models/medico.js";

export function getMedicos(req, res, next) {
  Medico.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Retreived all medico", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createMedico(req, res, next) {
  const { nombres, apellidos, tipo_documento, nro_documento, es_coordinador, especialidad, codigo_medico} = req.body;

  Medico.create(nombres, apellidos, tipo_documento, nro_documento, es_coordinador, especialidad, codigo_medico)
    .then(res.status(201).json({ success: true, msg: "Medico Created" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateMedico(req, res, next) {
  const { nombres, apellidos, tipo_documento, nro_documento, es_coordinador, especialidad, codigo_medico } = req.body;
  let id = req.params.id;

  Medico.update(nombres, apellidos, tipo_documento, nro_documento, es_coordinador, especialidad, codigo_medico, id)
    .then(res.status(200).json({ success: true, msg: "Medico Updated" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deleteMedico(req, res, next) {
  let id = req.params.id;

  Medico.delete(id)
    .then(res.status(200).json({ success: true, msg: "Medico Deleted" }))
    .catch((err) => res.status(400).json({ err }));
}
