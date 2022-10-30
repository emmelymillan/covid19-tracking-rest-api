import DB from "../models/index.js";
import sequelize from "sequelize";
import authJwt from "../middleware/authJwt.js";

const Caso = DB.caso;
const Paciente = DB.paciente;
const Medico = DB.medico;
const CentroMedico = DB.centroMedico;
const Balance = DB.balance;

export async function list(req, res) {
  const sort = JSON.parse(req.query.sort);
  const range = JSON.parse(req.query.range);
  const filter = JSON.parse(req.query.filter);

  const medicoId = authJwt.obtenerIdPorToken(filter.accessToken);

  const medico = await Medico.findByPk(medicoId);

  if (medico === null) {
    return res.status(401).send('Unautorizado!');
  }

  const rol = await medico
    .getRol()
    .then((role) => {
      return role.nombre;
    })
    .catch(() => {
      return "";
    });

  // if (rol === "ADMINISTRADOR") {
  const count = await Caso.count({
    where:
      rol === "COORDINADOR"
        ? { fk_centro_medico: medico.fk_centro_medico }
        : rol === "MEDICO"
        ? { fk_medico: medicoId }
        : null,
  });

  Caso.findAll({
    offset: range[0],
    limit: range[1] - range[0] + 1,
    order: [[sequelize.col(sort[0]), sort[1]]],
    include: [Paciente, Medico, CentroMedico],
    where:
      rol === "COORDINADOR"
        ? { fk_centro_medico: medico.fk_centro_medico }
        : rol === "MEDICO"
        ? { fk_medico: medicoId }
        : null,
  })
    .then((casos) => {
      res.setHeader("Content-Range", count);
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

  // buscamos el paciente por tipo de documento y nro de documento
  const pacienteRow = await Paciente.findOne({
    where: {
      tipo_documento: paciente.tipo_documento,
      nro_documento: paciente.nro_documento,
    },
  });

  var existCaso = [];

  // si el paciente existe, comprobamos que tenga casos activos
  if (pacienteRow != null) {
    existCaso = await Caso.findAll({
      where: {
        estado: true,
        fk_paciente: pacienteRow.id,
      },
    });
  }

  var casos = Array.from(existCaso);

  if (casos.length === 0) {
    if (pacienteRow != null) {
      // Si el paciente sí existe --> creamos el caso con los datos del paciente existente.
      Caso.create({
        estado,
        fecha_ingreso,
        fecha_recuperacion,
        fecha_fallecimiento,
        fk_medico,
        fk_centro_medico,
        fk_paciente: pacienteRow.id,
      })
        .then((caso) => {
          Balance.increment({ total: 1 }, { where: { id: 1 } });
          res.status(200).json({ id: caso.id });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    } else {
      // Si el paciente no existe --> creamos el caso con un paciente nuevo.
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
          Balance.increment({ total: 1 }, { where: { id: 1 } });
          res.status(200).json({ id: caso.id });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }
  } else {
    return res
      .status(400)
      .send(
        "El paciente ingresado ya se encuentra registrado con un caso activo."
      );
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
    fecha_fallecimiento_otro,
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
      estado:
        fecha_recuperacion != null ||
        fecha_fallecimiento != null ||
        fecha_fallecimiento_otro != null
          ? false
          : true,
      fecha_ingreso,
      fecha_recuperacion,
      fecha_fallecimiento,
      fecha_fallecimiento_otro,
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
      if (fecha_recuperacion && !fecha_fallecimiento) {
        Balance.increment({ recuperados: 1 }, { where: { id: 1 } });
      } else if (!fecha_recuperacion && fecha_fallecimiento) {
        Balance.increment({ fallecidos: 1 }, { where: { id: 1 } });
      }

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
