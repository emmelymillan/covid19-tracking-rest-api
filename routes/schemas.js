/**
 * @swagger
 *  components:
 *    schemas:
 *      Caso:
 *        type: object
 *        required:
 *          - estado
 *          - fecha_ingreso
 *          - fk_medico
 *          - fk_paciente
 *          - fk_centro_medico
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de caso.
 *            readOnly: true
 *          estado:
 *            type: string
 *            description: Estado actual del caso.
 *          fecha_ingreso:
 *            type: string
 *            format: date-time
 *            description: Fecha de ingreso del paciente.
 *          fecha_recuperacion:
 *            type: string
 *            format: date-time
 *            description: Fecha de recuperación del paciente.
 *          fecha_fallecimiento:
 *            type: string
 *            format: date-time
 *            description: Fecha de fallecimiento del paciente.
 *          fk_medico:
 *            type: integer
 *            description: ID del médico que crea el caso.
 *          fk_paciente:
 *            type: integer
 *            description: ID del paciente al que se le crea el caso.
 *          fk_centro_medico:
 *            type: integer
 *            description: ID del centro médico en donde se creó el caso.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Rol:
 *        type: object
 *        required:
 *          - nombre
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de rol.
 *            readOnly: true
 *          nombre:
 *            type: string
 *            description: Nombre del rol.
 *          descripcion:
 *            type: string
 *            description: Descripción del rol.
 */
