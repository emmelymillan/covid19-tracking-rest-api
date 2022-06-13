import {
  getSintomas,
  createSintoma,
  updateSintoma,
  deleteSintoma,
} from "../controllers/sintoma.controller.js";

export default (app) => {
    /**
   * @swagger
   * /sintomas:
   *  get:
   *      summary: Webservice para obtener la lista de sintomas.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/sintomas", getSintomas);

    /**
   * @swagger
   * /sintoma/new:
   *  post:
   *      summary: Webservice para crear sintoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sintoma'
   *      responses:
   *          "200":
   *            description: Sintoma creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Sintoma'
   */
  app.post("/sintoma/new", createSintoma);

    /**
   * @swagger
   * /sintoma/update/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar sintoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Sintoma'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del Sintoma a editar
   *      responses:
   *          "200":
   *            description: Sintoma editado exitosamente.
   */
  app.put("/sintoma/update/:id", updateSintoma);

    /**
   * @swagger
   * /sintoma/delete/{id}:
   *   delete:
   *      summary: Webservice para eliminar sintoma.
   *      tags: [Sintomas]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del sintoma a eliminar
   *      responses:
   *          "200":
   *            description: Sintoma eliminado exitosamente.
   */
  app.delete("/sintoma/delete/:id", deleteSintoma);
};
