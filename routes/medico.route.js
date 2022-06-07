import {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} from "../controllers/medico.controller.js";

export default (app) => {
  app.get("/medico", getMedicos);
  app.post("/medico/new", createMedico);
  app.put("/medico/update/:id", updateMedico);
  app.delete("/medico/delete/:id", deleteMedico);
};
