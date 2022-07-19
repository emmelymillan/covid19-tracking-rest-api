import authJwt from "../middleware/authJwt.js";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
} from "../controllers/usuario.controller.js";

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
   * /test/all:
   *  get:
   *      summary: Webservice para obtener la vista pública
   *      tags: [Test]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/test/all", allAccess);

  /**
   * @swagger
   * /test/user:
   *  get:
   *      summary: Webservice para obtener la vista de usuario.
   *      tags: [Test]
   *      parameters:
   *        - in: header
   *          name: x-access-token
   *          required: true
   *          description: Token de acceso del usuario logueado.
   *          schema:
   *            type: string
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/test/user", [authJwt.verifyToken], userBoard);

  /**
   * @swagger
   * /test/mod:
   *  get:
   *      summary: Webservice para obtener la vista de moderador.
   *      tags: [Test]
   *      parameters:
   *        - in: header
   *          name: x-access-token
   *          required: true
   *          description: Token de acceso del usuario logueado.
   *          schema:
   *            type: string
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
  );

  /**
   * @swagger
   * /test/admin:
   *  get:
   *      summary: Webservice para obtener la vista de administrador.
   *      tags: [Test]
   *      parameters:
   *        - in: header
   *          name: x-access-token
   *          required: true
   *          description: Token de acceso del usuario logueado.
   *          schema:
   *            type: string
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/test/admin", [authJwt.verifyToken, authJwt.isAdmin], adminBoard);
}
