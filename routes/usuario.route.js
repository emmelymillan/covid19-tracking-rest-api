import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.controller.js";

export default (app) => {
  /**
   * @swagger
   * /usuarios:
   *  get:
   *      summary: Webservice para obtener la lista de usuarios.
   *      tags: [Usuarios]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/usuario", getUsuarios);

  /**
   * @swagger
   * /usuario/new:
   *  post:
   *      summary: Webservice para crear usuario.
   *      tags: [Usuarios]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Usuario'
   *      responses:
   *          "200":
   *            description: Usuario creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Usuario'
   */
  app.post("usuario/new", createUsuario);

  /**
   * @swagger
   * /usuario/update/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar usuario.
   *      tags: [Usuarios]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Usuario'
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
  app.put("/usuario/update/:id", updateUsuario);

  /**
   * @swagger
   * /usuario/delete/{id}:
   *   delete:
   *      summary: Webservice para eliminar usuario.
   *      tags: [Usuarios]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del usuario a eliminar
   *      responses:
   *          "200":
   *            description: Usuario eliminado exitosamente.
   */
  app.delete("/usuario/delete/:id", deleteUsuario);
};
