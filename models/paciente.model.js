const Paciente = (sequelize, Sequelize) => {
  const Paciente = sequelize.define(
    "paciente",
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
      fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nro_telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      direccion_latitud: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      direccion_longitud: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Paciente;
};

export default Paciente;
