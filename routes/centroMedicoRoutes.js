import {
    getCentrosMedico,
    createCentroMedico,
    updateCentroMedico,
    deleteCentroMedico,
  } from "../controllers/centroMedicoController.js";
  
  export default (app) => {
    app.get("/cm", getCentrosMedico);
    app.post("/cm/new", createCentroMedico);
    app.put("/cm/update/:id", updateCentroMedico);
    app.delete("/cm/delete/:id", deleteCentroMedico);
  };
  