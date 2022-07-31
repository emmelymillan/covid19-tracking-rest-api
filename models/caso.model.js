const Caso = (sequelize, Sequelize) => {
  const Caso = sequelize.define(
    "caso",
    {
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_recuperacion: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_fallecimiento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "fecha_creacion",
      updatedAt: "fecha_actualizacion",
      freezeTableName: true,
    }
  );
  return Caso;
};

export default Caso;
