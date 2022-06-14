const User = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "usuario",
    {
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
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
  return User;
};

export default User;
