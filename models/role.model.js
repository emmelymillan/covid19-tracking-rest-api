const Role = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "rol",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Role;
};

export default Role;
