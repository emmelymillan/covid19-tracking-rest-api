import { signin } from "../controllers/auth.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
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
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

  /**
   * @swagger
   * /auth/signin:
   *  post:
   *      summary: Webservice para iniciar sesión.
   *      tags: [Auth]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                required:
   *                  - correo
   *                  - clave
   *                properties:
   *                  correo:
   *                    type: string
   *                    description: Correo electrónico con el que desea iniciar sesión.
   *                  clave:
   *                    type: string
   *                    description: Clave del médico.
   *      responses:
   *          "200":
   *            description: Success.
   *          "404":
   *            description: Médico Not found.
   *            content:
   *               application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   */
  app.post("/auth/signin", signin);
}
