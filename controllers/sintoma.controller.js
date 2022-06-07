import Sintoma from "../models/sintoma.model.js";

export function getSintomas(req, res, next) {
  Sintoma.get()
    .then((data) =>
      res
        .status(200)
        .json({ title: "Recibir todos los sintomas", success: true, data })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createSintoma(req, res, next) {
  const { nombre } = req.body;

  Sintoma.create(nombre)
    .then(res.status(201).json({ success: true, msg: "Sintoma creado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateSintoma(req, res, next) {
  const { nombre } = req.body;
  let id = req.params.id;

  Sintoma.update(nombre, id)
    .then(res.status(200).json({ success: true, msg: "Sintoma actualizado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function deleteSintoma(req, res, next) {
  let id = req.params.id;

  Sintoma.delete(id)
    .then(res.status(200).json({ success: true, msg: "Sintoma eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
