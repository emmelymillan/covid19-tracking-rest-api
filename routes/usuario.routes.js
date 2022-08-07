import authJwt from "../middleware/authJwt.js";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
} from "../controllers/usuario.controller.js";

export default function (app) {
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
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    res.append("Access-Control-Expose-Headers", "Content-Range");
    res.append("Content-Range", 5);
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
