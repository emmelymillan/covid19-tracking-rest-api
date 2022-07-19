import { signin } from "../controllers/auth.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
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
