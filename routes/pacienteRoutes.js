import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/pacienteController.js";

export default (app) => {
  app.get("/paciente", getPacientes);
  app.post("/paciente/new", createPaciente);
  app.put("/paciente/update/:id", updatePaciente);
  app.delete("/paciente/delete/:id", deletePaciente);
};
