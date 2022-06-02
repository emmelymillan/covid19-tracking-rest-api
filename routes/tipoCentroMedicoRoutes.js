import {
  getTiposCentroMedico,
  createTipoCentroMedico,
  updateTipoCentroMedico,
  deleteTipoCentroMedico,
} from "../controllers/tipoCentroMedicoController.js";

export default (app) => {
  app.get("/tcm", getTiposCentroMedico);
  app.post("/tcm/new", createTipoCentroMedico);
  app.put("/tcm/update/:id", updateTipoCentroMedico);
  app.delete("/tcm/delete/:id", deleteTipoCentroMedico);
};
