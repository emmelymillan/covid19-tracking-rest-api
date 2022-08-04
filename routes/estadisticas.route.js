import { getCasesBalance } from "../controllers/estadisticas.controller.js";
export default (app) => {
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.append("Content-Range", 5);
    next();
  });

  /**
   * @swagger
   * /estadisticas:
   *  get:
   *      summary: Webservice para obtener el balance general de casos.
   *      tags: [Estadisticas]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/estadisticas/:id", getCasesBalance);
};
