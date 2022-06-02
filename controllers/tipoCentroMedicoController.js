import TipoCentroMedico from "../models/tipoCentroMedico.js";

export function getTiposCentroMedico(req, res, next) {
  TipoCentroMedico.get()
    .then((data) =>
      res.status(200).json({
        title: "Recibir todos los Tipo centro medico",
        success: true,
        data,
      })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createTipoCentroMedico(req, res, next) {
  const { nombre } = req.body;

  TipoCentroMedico.create(nombre)
    .then(
      res.status(201).json({ success: true, msg: "Tipo Centro Medico creado" })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function updateTipoCentroMedico(req, res, next) {
  const { nombre } = req.body;
  let id = req.params.id;

  TipoCentroMedico.update(nombre, id)
    .then(
      res
        .status(200)
        .json({ success: true, msg: "Tipo Centro Medico actualizado" })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function deleteTipoCentroMedico(req, res, next) {
  let id = req.params.id;

  TipoCentroMedico.delete(id)
    .then(
      res
        .status(200)
        .json({ success: true, msg: "Tipo Centro Medico eliminado" })
    )
    .catch((err) => res.status(400).json({ err }));
}
