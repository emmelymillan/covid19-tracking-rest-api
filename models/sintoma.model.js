import db from "../config/config.js";

const Sintoma = {};

Sintoma.create = (nombre) => {
  return db.none(`INSERT into sintoma(nombre)` + `VALUES($1)`, [nombre]);
};

Sintoma.get = () => {
  return db.any("SELECT * FROM sintoma");
};

Sintoma.update = (nombre, sintomaId) => {
  return db.none(`UPDATE sintoma SET nombre = $1 WHERE id = $2`, [
    nombre,
    sintomaId,
  ]);
};

Sintoma.delete = (sintomaId) => {
  return db.none(`DELETE from sintoma WHERE id = $1`, sintomaId);
};

export default Sintoma;
