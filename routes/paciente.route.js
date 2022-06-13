import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/paciente.controller.js";

export default (app) => {
  /**
   * @swagger
   * /paciente:
   *  get:
   *      summary: Webservice para obtener la lista de paciente.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      responses:
   *          '200':
   *              description: ok
   *
   */
  app.get("/paciente", getPacientes);

  /**
   * @swagger
   * /paciente/new:
   *  post:
   *      summary: Webservice para crear paciente.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Paciente'
   *      responses:
   *          "200":
   *            description: Paciente creado.
   *            content:
   *               application/json:
   *                schema:
   *                  $ref: '#/components/schemas/Paciente'
   */
  app.post("/paciente/new", createPaciente);

  /**
   * @swagger
   * /paciente/update/{id}:
   *   put:
   *      summary: Webservice para editar/actualizar paciente.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Paciente'
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del paciente a editar
   *      responses:
   *          "200":
   *            description: Paciente editado exitosamente.
   */
  app.put("/paciente/update/:id", updatePaciente);

  /**
   * @swagger
   * /paciente/delete/{id}:
   *   delete:
   *      summary: Webservice para eliminar paciente.
   *      tags: [Pacientes]
   *      security:
   *          - ApiKeyAuth: []
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *              required: true
   *              description: El ID del paciente a eliminar
   *      responses:
   *          "200":
   *            description: Paciente eliminado exitosamente.
   */
  app.delete("/paciente/delete/:id", deletePaciente);
};
