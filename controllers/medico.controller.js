import DB from "../models/index.js";
import sequelize from "sequelize";
import pkg from "bcryptjs";
import authJwt from "../middleware/authJwt.js";

const { hashSync } = pkg;
const Medico = DB.medico;
const CentroMedico = DB.centroMedico;
const Role = DB.role;

// Listar medicos
export async function list(req, res) {
  const sort = JSON.parse(req.query.sort);
  const range = JSON.parse(req.query.range);
  const filter = JSON.parse(req.query.filter);

  const medicoId = authJwt.obtenerIdPorToken(filter.accessToken);

  const medico = await Medico.findByPk(medicoId);

  const rol = await medico
    .getRol()
    .then((role) => {
      return role.nombre;
    })
    .catch(() => {
      return "";
    });

  const count = await Medico.count({
    where:
      rol === "COORDINADOR"
        ? {
            fk_centro_medico: medico.fk_centro_medico,
            fk_rol: 3, // medicos
          }
        : rol === "MEDICO"
        ? {
            id: medicoId,
            fk_rol: 3, //medicos
          }
        : null,
  });

  Medico.findAll({
    offset: range[0],
    limit: range[1] - range[0] + 1,
    order: [[sequelize.col(sort[0]), sort[1]]],
    include: Role,
    where:
      rol === "COORDINADOR"
        ? {
            fk_centro_medico: medico.fk_centro_medico,
            fk_rol: 3, // medicos
          }
        : rol === "MEDICO"
        ? {
            id: medicoId,
            fk_rol: 3, //medicos
          }
        : null,
  })
    .then((medicos) => {
      res.setHeader("Content-Range", count);
      res.status(200).send(medicos);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Guardar medico
export async function create(req, res) {
  const {
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    especialidad,
    codigo_medico,
    correo,
    clave,
    rol,
    fk_centro_medico,
  } = req.body;

  const medico = await Medico.findOne({
    where: {
      tipo_documento: tipo_documento,
      nro_documento: nro_documento,
    },
  });

  if (medico === null) {
    if (rol === "COORDINADOR") {
      const medicos = await Medico.findAll({
        where: {
          es_coordinador: true,
          fk_centro_medico: fk_centro_medico,
          activo: true,
        },
      });

      if (Array.from(medicos).length > 0) {
        return res
          .status(500)
          .send("El centro medico ya tiene asociado un usuario coordinador.");
      }
    }

    Medico.create({
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      es_coordinador: rol === "COORDINADOR" ? true : false,
      especialidad,
      codigo_medico,
      correo,
      clave: hashSync(clave, 8),
      rol,
      fk_centro_medico,
    })
      .then((medico) => {
        if (rol) {
          Role.findOne({
            where: {
              nombre: rol,
            },
          }).then((roles) => {
            medico.setRol(roles).then(() => {
              res.status(200).json({ id: medico.id });
            });
          });
        } else {
          // medico con rol 1
          medico.setRol(1).then(() => {
            res.send("Médico registrado exitosamente.");
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    return res.status(400).send("El medico ya se encuentra registrado/");
  }
}

// Obtener medico
export async function findOne(req, res) {
  Medico.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(async (medico) => {
      const centroMedico = await CentroMedico.findByPk(medico.fk_centro_medico);

      if (centroMedico) {
        medico.dataValues.centroMedico = centroMedico.nombre;
      }
      delete medico.dataValues.clave;

      res.status(200).json(medico);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Actualizar medico
export function update(req, res) {
  const {
    nombres,
    apellidos,
    tipo_documento,
    nro_documento,
    especialidad,
    codigo_medico,
    activo,
  } = req.body;

  Medico.update(
    {
      nombres,
      apellidos,
      tipo_documento,
      nro_documento,
      especialidad,
      codigo_medico,
      activo,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((medico) => {
      res.status(200).json({ id: medico });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

// Borrar medico
export function destroy(req, res) {
  Medico.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((medico) => {
      res.status(200).json(medico);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}
