import TipoCentroMedico from "../models/tipoCentroMedico.js";

export function getTiposCentroMedico(req, res, next) {
  TipoCentroMedico.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Retreived all Tipo centro medico", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createTipoCentroMedico(req, res, next) {
  const { name } = req.body;

  TipoCentroMedico.create(name)
    .then(res.status(201).json({ success: true, msg: "Tipo Centro Medico Created" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateTipoCentroMedico(req, res, next) {
  const { name } = req.body;
  let id = req.params.id;

  TipoCentroMedico.update(name, id)
    .then(res.status(200).json({ success: true, msg: "Tipo Centro Medico Updated" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deleteTipoCentroMedico(req, res, next) {
  let id = req.params.id;

  TipoCentroMedico.delete(id)
    .then(res.status(200).json({ success: true, msg: "Tipo Centro Medico Deleted" }))
    .catch((err) => res.status(400).json({ err }));
}
