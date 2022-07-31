const Sintoma = (sequelize, Sequelize) => {
  const Sintoma = sequelize.define(
    "sintoma",
    {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    { timestamps: false, freezeTableName: true }
  );
  return Sintoma;
};

export default Sintoma;
