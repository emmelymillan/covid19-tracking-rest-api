import db from '../config/config.js';

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

// CRUD -- Create Read Update Delete
// CREATE USER
// User.create = (title, content) => {
//     return db.none(`INSERT into usuario(title, content)` + `VALUES($1, $2)`, [title, content]);
// }

// GET ALL USERS
User.get = () => {
    return db.any('SELECT * FROM usuario');
}

// UPDATE AN USER
// User.update = (title, content, articleID) => {
//     return db.none(`UPDATE usuario SET title = $1, content = $2 WHERE id = $3`, [title, content, articleID]);
// }

// DELETE AN USER
User.delete = userId => {
    return db.none(`DELETE from usuario WHERE id = $1`, userId);
}

export default User;