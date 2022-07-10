// import { verifySignUp } from "../middleware/index.js";
import verifySignUp from "../middleware/verifySignUp.js";
import { signup, signin } from "../controllers/auth.controller.js";

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
   * /auth/signup:
   *  post:
   *      summary: Webservice para registrar usuario.
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
   *                  - username
   *                  - email
   *                  - password
   *                  - roles
   *                properties:
   *                  username:
   *                    type: string
   *                    description: Nombre de usuario con el que desea iniciar sesión.
   *                  email:
   *                    type: string
   *                    description: Email del usuario.
   *                  password:
   *                    type: string
   *                    format: password
   *                    description: Contraseña del usuario.
   *                  roles:
   *                    type: array
   *                    items: {}
   *                    description: Rol del usuario.
   *      responses:
   *          "200":
   *            description: Success.
   *          "404":
   *            description: Error.
   *            content:
   *               application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   */
  app.post(
    "/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    signup
  );

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
   *                  - username
   *                  - password
   *                properties:
   *                  username:
   *                    type: string
   *                    description: Nombre de usuario con el que desea iniciar sesión.
   *                  password:
   *                    type: string
   *                    description: Contraseña del usuario.
   *      responses:
   *          "200":
   *            description: Success.
   *          "404":
   *            description: User Not found.
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
