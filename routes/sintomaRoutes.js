import {
  getSintomas,
  createSintoma,
  updateSintoma,
  deleteSintoma,
} from "../controllers/sintomaController.js";

export default (app) => {
  app.get("/sintomas", getSintomas);
  app.post("/sintoma/new", createSintoma);
  app.put("/sintoma/update/:id", updateSintoma);
  app.delete("/sintoma/delete/:id", deleteSintoma);
};
