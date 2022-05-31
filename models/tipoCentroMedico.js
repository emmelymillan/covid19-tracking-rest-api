import db from '../config/config.js';

const TipoCentroMedico = {};

TipoCentroMedico.create = (nombre) => {
    return db.none(`INSERT into tipo_centro_medico(nombre)` + `VALUES($1)`, [nombre]);
}

TipoCentroMedico.get = () => {
    return db.any('SELECT * FROM tipo_centro_medico');
}

TipoCentroMedico.update = (nombre, tipoCentroMedicoId) => {
    return db.none(`UPDATE tipo_centro_medico SET nombre = $1 WHERE id = $2`, [nombre, tipoCentroMedicoId]);
}

TipoCentroMedico.delete = tipoCentroMedicoId => {
    return db.none(`DELETE from tipo_centro_medico WHERE id = $1`, tipoCentroMedicoId);
}

export default TipoCentroMedico;