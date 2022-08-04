const Balance = (sequelize, Sequelize) => {
  const Balance = sequelize.define(
    "balance",
    {
      total: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      recuperados: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fallecidos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Balance;
};

export default Balance;
