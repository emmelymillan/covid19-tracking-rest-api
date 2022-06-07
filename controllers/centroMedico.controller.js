import CentroMedico from "../models/centroMedico.model.js";

export function getCentrosMedico(req, res, next) {
  CentroMedico.get()
    .then((data) =>
      res
        .status(200)
        .json({
          title: "Recibir todos los centros medicos",
          success: true,
          data,
        })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function createCentroMedico(req, res, next) {
  const { nombre, fk_medico, fk_parroquia, fk_tipo_centro_medico } = req.body;

  CentroMedico.create(nombre, fk_medico, fk_parroquia, fk_tipo_centro_medico)
    .then(res.status(201).json({ success: true, msg: "Centro Medico creado" }))
    .catch((err) => res.status(400).json({ err }));
}

export function updateCentroMedico(req, res, next) {
  const { nombre, fk_medico, fk_parroquia, fk_tipo_centro_medico } = req.body;
  let id = req.params.id;

  CentroMedico.update(
    nombre,
    fk_medico,
    fk_parroquia,
    fk_tipo_centro_medico,
    id
  )
    .then(
      res.status(200).json({ success: true, msg: "Centro Medico actualizado" })
    )
    .catch((err) => res.status(400).json({ err }));
}

export function deleteCentroMedico(req, res, next) {
  let id = req.params.id;

  CentroMedico.delete(id)
    .then(
      res.status(200).json({ success: true, msg: "Centro Medico eliminado" })
    )
    .catch((err) => res.status(400).json({ err }));
}
