import DB from "../models/index.js";
import sequelize from "sequelize";

const Caso = DB.caso;
const Paciente = DB.paciente;
const Medico = DB.medico;
const CentroMedico = DB.centroMedico;

export function list(req, res) {
  // const sort = JSON.parse(req.query.sort);

  Caso.findAll({
    include: [Paciente, Medico, CentroMedico],
    // order: [[sequelize.col(sort[0]), sort[1]]],
  })
    .then((casos) => {
      res.setHeader("Content-Range", casos.length);
      res.status(200).send(casos);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export async function create(req, res) {
  const {
    estado,
    fecha_ingreso,
    fecha_recuperacion,
    fecha_fallecimiento,
    fk_medico,
    fk_centro_medico,
    paciente,
  } = req.body;

  const existePaciente = await Paciente.findOne({
    where: {
      tipo_documento: paciente.tipo_documento,
      nro_documento: paciente.nro_documento,
    },
  });

  if (existePaciente === null) {
    Caso.create(
      {
        estado,
        fecha_ingreso,
        fecha_recuperacion,
        fecha_fallecimiento,
        fk_medico,
        fk_centro_medico,
        paciente,
      },
      {
        include: Paciente,
      }
    )
      .then((caso) => {
        res.status(200).json({ id: caso.id });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    return res.status(400).json({
      code: 400,
      message:
        "El paciente creado ya se encuentra registrado con un caso activo.",
    });
  }
}

export function findOne(req, res) {
  Caso.findOne({
    where: {
      id: req.params.id,
    },
    include: [Paciente, Medico, CentroMedico],
  })
    .then((caso) => {
      res.status(200).json(caso);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Actualizar caso
export async function update(req, res) {
  const {
    estado,
    fecha_ingreso,
    fecha_recuperacion,
    fecha_fallecimiento,
    fk_medico,
    fk_centro_medico,
    paciente,
  } = req.body;

  await Paciente.update(
    {
      nombres: paciente.nombres,
      apellidos: paciente.apellidos,
      fecha_nacimiento: paciente.fecha_nacimiento,
      genero: paciente.genero,
      nro_telefono: paciente.nro_telefono,
      direccion_latitud: paciente.direccion_latitud,
      direccion_longitud: paciente.direccion_longitud,
      antecedentes_medicos: paciente.antecedentes_medicos,
    },
    {
      where: {
        id: paciente.id,
      },
    }
  );

  Caso.update(
    {
      estado,
      fecha_ingreso,
      fecha_recuperacion,
      fecha_fallecimiento,
      fk_medico,
      fk_centro_medico,
      paciente,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((caso) => {
      res.status(200).json({ id: caso });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export function deleteCaso(req, res, next) {
  let id = req.params.id;

  Caso.delete(id)
    .then(res.status(200).json({ success: true, msg: "Caso eliminado" }))
    .catch((err) => res.status(400).json({ err }));
}
