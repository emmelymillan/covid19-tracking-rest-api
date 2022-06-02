import {
  getCasos,
  createCaso,
  updateCaso,
  deleteCaso,
} from "../controllers/casoController.js";

export default (app) => {
  app.get("/caso", getCasos);
  app.post("/caso/new", createCaso);
  app.put("/caso/update/:id", updateCaso);
  app.delete("/caso/delete/:id", deleteCaso);
};
