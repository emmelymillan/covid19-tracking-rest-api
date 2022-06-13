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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Sintoma:
 *        type: object
 *        required:
 *          - nombre
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de sintoma.
 *            readOnly: true
 *          nombre:
 *            type: string
 *            description: Nombre del sintoma.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Permiso:
 *        type: object
 *        required:
 *          - nombre
 *          - codigo
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de permiso.
 *            readOnly: true
 *          nombre:
 *            type: string
 *            description: Nombre del permiso.
 *          codigo:
 *            type: string
 *            description: Codigo del permiso.
 *          descripcion:
 *            type: string
 *            description: Descripción del permiso.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Usuario:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - fecha_creacion
 *          - fk_medico
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de usuario.
 *            readOnly: true
 *          email:
 *            type: string
 *            description: Email del usuario.
 *          password:
 *            type: string
 *            description: Password del usuario.
 *          fecha_creacion:
 *            type: string
 *            format: date-time
 *            description: Fecha de creacion del usuario.
 *          fecha_actualizacion:
 *            type: string
 *            format: date-time
 *            description: Fecha de actualizacion del usuario.
 *          activo:
 *            type: boolean
 *            description: Activo del usuario.
 *          fk_medico:
 *            type: integer
 *            description: ID del médico que crea el usuario.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Paciente:
 *        type: object
 *        required:
 *          - nombres
 *          - apellidos
 *          - tipo_documento
 *          - nro_documento
 *          - fecha_nacimiento
 *          - genero
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de paciente.
 *            readOnly: true
 *          nombres:
 *            type: string
 *            description: Nombres actuales del paciente.
 *          apellidos:
 *            type: string
 *            description: Apellidos actuales del paciente.
 *          tipo_documento:
 *            type: string
 *            description: Tipo de documento del paciente.
 *          nro_documento:
 *            type: string
 *            description: Numero de documento del paciente.
 *          fecha_nacimiento:
 *            type: string
 *            format: date-time
 *            description: Fecha de nacimiento del paciente.
 *          genero:
 *            type: integer
 *            description: Genero del paciente.
 *          nro_telefono:
 *            type: integer
 *            description: Numero de telefono del paciente.
 *          direccion_latitud:
 *            type: integer
 *            description: Latitud de la direccion del paciente.
 *          direccion_longitud:
 *            type: integer
 *            description: Longitud de la direccion del paciente.
 *          antecedentes_medicos:
 *            type: integer
 *            description: Antecedentes médicos del paciente.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Medico:
 *        type: object
 *        required:
 *          - nombres
 *          - apellidos
 *          - tipo_documento
 *          - nro_documento
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado de medico.
 *            readOnly: true
 *          nombres:
 *            type: string
 *            description: Nombres actuales del medico.
 *          apellidos:
 *            type: string
 *            description: Apellidos actuales del medico.
 *          tipo_documento:
 *            type: string
 *            description: Tipo de documento del medico.
 *          nro_documento:
 *            type: string
 *            description: Numero de documento del medico.
 *          es_coordinador:
 *            type: boolean
 *            description: Es medico coordinador.
 *          especialidad:
 *            type: integer
 *            description: Especialidad del medico.
 *          codigo_medico:
 *            type: integer
 *            description: Codigo del medico.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CentroMedico:
 *        type: object
 *        required:
 *          - nombre
 *          - fk_medico
 *          - fk_parroquia
 *          - fk_tipo_centro_medico
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado del centro medico.
 *            readOnly: true
 *          nombre:
 *            type: string
 *            description: Nombre del centro medico.
 *          fk_medico:
 *            type: integer
 *            description: ID del médico del centro medico.
 *          fk_parroquia:
 *            type: integer
 *            description: ID de la parroquia del centro medico.
 *          fk_tipo_centro_medico:
 *            type: integer
 *            description: ID del tipo de centro médico.
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      TipoCentroMedico:
 *        type: object
 *        required:
 *          - nombre
 *        properties:
 *          id:
 *            type: integer
 *            description: El id auto-generado del tipo centro medico.
 *            readOnly: true
 *          nombre:
 *            type: string
 *            description: Nombre del tipo de centro medico.
 */
