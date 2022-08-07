import { getCasesBalance } from "../controllers/estadisticas.controller.js";
export default (app) => {
  app.use((req, res, next) => {
    const allowedOrigins = [
      "http://127.0.0.1:3001",
      "http://localhost:3000",
      "http://127.0.0.1:9000",
      "https://covid19-tracking-em.herokuapp.com",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
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
