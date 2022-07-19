const Medico = (sequelize, Sequelize) => {
  const Medico = sequelize.define(
    "medico",
    {
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_documento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nro_documento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      es_coordinador: {
        type: Sequelize.BOOLEAN,
      },
      especialidad: {
        type: Sequelize.STRING,
      },
      codigo_medico: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clave: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_actualizacion: {
        type: Sequelize.DATE,
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      createdAt: "fecha_creacion",
      updatedAt: "fecha_actualizacion",
      freezeTableName: true,
    }
  );
  return Medico;
};

export default Medico;
