import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.controller.js";

export default (app) => {
  app.get("/usuario", getUsuarios);
  app.post("usuario/new", createUsuario);
  app.put("/usuario/update/:id", updateUsuario);
  app.delete("/usuario/delete/:id", deleteUsuario);
};
