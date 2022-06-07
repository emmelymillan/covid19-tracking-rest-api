import {
  getPermisos,
  createPermiso,
  updatePermiso,
  deletePermiso,
} from "../controllers/permiso.controller.js";

export default (app) => {
  app.get("/permisos", getPermisos);
  app.post("/permiso/new", createPermiso);
  app.put("/permiso/update/:id", updatePermiso);
  app.delete("/permiso/delete/:id", deletePermiso);
};
