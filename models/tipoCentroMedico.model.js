const TipoCentroMedico = (sequelize, Sequelize) => {
  const TipoCentroMedico = sequelize.define(
    "tipo_centro_medico",
    {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return TipoCentroMedico;
};

export default TipoCentroMedico;
