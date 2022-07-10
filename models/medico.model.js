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
    },
    { timestamps: false, freezeTableName: true }
  );
  return Medico;
};

export default Medico;
