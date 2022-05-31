import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/rolController.js";

export default (app) => {
  app.get("/roles", getRoles);
  app.post("/role/new", createRole);
  app.put("/role/update/:id", updateRole);
  app.delete("/role/delete/:id", deleteRole);
};
