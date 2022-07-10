// import { authJwt } from "../middleware/index.js";
import authJwt from "../middleware/authJwt.js";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  create,
  list,
  findOne,
  update,
} from "../controllers/usuario.controller.js";
import verifySignUp from "../middleware/verifySignUp.js";

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

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /users:
   *  get:
   *      summary: Webservice para obtener la lista de usuarios.
   *      tags: [Users]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/users", list);

  /**
   * @swagger
   * /users:
   *  post:
   *      summary: Webservice para registrar usuario.
   *      tags: [Users]
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
  app.post("/users", [verifySignUp.checkDuplicateUsernameOrEmail], create);

  /**
   * @swagger
   * /users/{id}:
   *  get:
   *      summary: Webservice para obtener un solo usuario.
   *      tags: [Users]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/users/:id", findOne);

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar usuario.
   *      tags: [Users]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del usuario a editar
   *      responses:
   *          "200":
   *            description: Usuario editado exitosamente.
   */
  app.put("/users/:id", update);
}
