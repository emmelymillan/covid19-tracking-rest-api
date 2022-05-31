const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "covid19_tracking_app",
  password: "12345",
  port: 5432,
});

const getMunicipios = (request, response) => {
  pool.query(
    "SELECT m.id as id_municipio, m.nombre as municipio, e.nombre as estado FROM municipio m, estado e WHERE m.fk_estado = e.id",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getMunicipios,
};
