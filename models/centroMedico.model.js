const CentroMedico = (sequelize, Sequelize) => {
  const CentroMedico = sequelize.define(
    "centro_medico",
    {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion_latitud: {
        type: Sequelize.STRING,
      },
      direccion_longitud: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return CentroMedico;
};

export default CentroMedico;
