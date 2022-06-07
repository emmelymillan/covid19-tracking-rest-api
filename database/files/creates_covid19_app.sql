CREATE TABLE CIUDAD (
    id BIGINT NOT NULL,
    fk_estado BIGINT NOT NULL,
    nombre CHARACTER VARYING(200) NOT NULL,
    capital INT NOT NULL DEFAULT 0,
    CONSTRAINT pk_ciudad PRIMARY KEY (id)
);

CREATE TABLE ESTADO (
    id BIGINT NOT NULL,
    nombre CHARACTER VARYING(250) NOT NULL,
    iso_3166_2 CHARACTER VARYING(4) NOT NULL,
    CONSTRAINT pk_estado PRIMARY KEY (id)
);

CREATE TABLE MUNICIPIO (
    id BIGINT NOT NULL,
    fk_estado BIGINT NOT NULL,
    nombre CHARACTER VARYING(100) NOT NULL,
    CONSTRAINT pk_municipio PRIMARY KEY (id)
);

CREATE TABLE PARROQUIA (
    id BIGINT NOT NULL,
    fk_municipio BIGINT NOT NULL,
    nombre CHARACTER VARYING(250) NOT NULL,
    CONSTRAINT pk_parroquia PRIMARY KEY (id)
);

ALTER TABLE
    CIUDAD
ADD
    CONSTRAINT fk_estado_ciudad FOREIGN KEY (fk_estado) REFERENCES ESTADO (id);

ALTER TABLE
    MUNICIPIO
ADD
    CONSTRAINT fk_estado_municipio FOREIGN KEY (fk_estado) REFERENCES ESTADO (id);

ALTER TABLE
    PARROQUIA
ADD
    CONSTRAINT fk_municipio_parroquia FOREIGN KEY (fk_municipio) REFERENCES MUNICIPIO (id);

------------------------------------------------
CREATE TABLE ROL (
    id BIGSERIAL NOT NULL,
    nombre CHARACTER VARYING(128) NOT NULL,
    descripcion TEXT,
    CONSTRAINT pk_rol PRIMARY KEY (id)
);

CREATE TABLE PERMISO (
    id BIGSERIAL NOT NULL,
    nombre CHARACTER VARYING(128) NOT NULL,
    codigo CHARACTER VARYING(64) UNIQUE NOT NULL,
    descripcion TEXT,
    CONSTRAINT pk_permiso PRIMARY KEY (id)
);

CREATE TABLE ROL_PERMISO (
    id BIGSERIAL NOT NULL,
    fk_rol BIGINT NOT NULL,
    fk_permiso BIGINT NOT NULL,
    CONSTRAINT fk_rol_rol_permiso FOREIGN KEY (fk_rol) REFERENCES ROL (id),
    CONSTRAINT fk_permiso_rol_permiso FOREIGN KEY (fk_permiso) REFERENCES PERMISO (id),
    CONSTRAINT pk_rol_permiso PRIMARY KEY (id)
);

CREATE TABLE PACIENTE (
    id BIGSERIAL NOT NULL,
    nombres CHARACTER VARYING(200) NOT NULL,
    apellidos CHARACTER VARYING(200) NOT NULL,
    tipo_documento CHARACTER VARYING(64) NOT NULL,
    nro_documento CHARACTER VARYING(64) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero CHAR(1),
    nro_telefono CHARACTER VARYING(20),
    direccion_latitud TEXT,
    direccion_longitud TEXT,
    antecedentes_medicos TEXT,
    CONSTRAINT pk_paciente PRIMARY KEY (id)
);

CREATE TABLE SINTOMA (
    id BIGSERIAL NOT NULL,
    nombre CHARACTER VARYING(128) NOT NULL,
    CONSTRAINT pk_sintoma PRIMARY KEY (id)
);

CREATE TABLE PACIENTE_SINTOMA (
    id BIGSERIAL NOT NULL,
    fk_paciente BIGINT NOT NULL,
    fk_sintoma BIGINT NOT NULL,
    CONSTRAINT fk_paciente_paciente_sintoma FOREIGN KEY (fk_paciente) REFERENCES PACIENTE (id),
    CONSTRAINT fk_sintoma_paciente_sintoma FOREIGN KEY (fk_sintoma) REFERENCES SINTOMA (id),
    CONSTRAINT pk_paciente_sintoma PRIMARY KEY (id)
);

CREATE TABLE MEDICO (
    id BIGSERIAL NOT NULL,
    nombres CHARACTER VARYING(200) NOT NULL,
    apellidos CHARACTER VARYING(200) NOT NULL,
    tipo_documento CHARACTER VARYING(64) NOT NULL,
    nro_documento CHARACTER VARYING(64) NOT NULL,
    es_coordinador BOOLEAN DEFAULT false,
    especialidad CHARACTER VARYING(200),
    codigo_medico CHARACTER VARYING(200),
    CONSTRAINT pk_medico PRIMARY KEY (id)
);

CREATE TABLE USUARIO (
    id BIGSERIAL NOT NULL,
    email CHARACTER VARYING(200) NOT NULL,
    password CHARACTER VARYING(255) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT now(),
    fecha_actualizacion TIMESTAMP,
    activo BOOLEAN DEFAULT true,
    fk_medico BIGINT NOT NULL,
    CONSTRAINT fk_medico_usuario FOREIGN KEY (fk_medico) REFERENCES USUARIO (id),
    CONSTRAINT pk_usuario PRIMARY KEY (id)
);

CREATE TABLE TIPO_CENTRO_MEDICO (
    id BIGSERIAL NOT NULL,
    nombre CHARACTER VARYING(64) NOT NULL,
    CONSTRAINT pk_tipo_centro_medico PRIMARY KEY (id)
);

CREATE TABLE CENTRO_MEDICO (
    id BIGSERIAL NOT NULL,
    nombre CHARACTER VARYING(64) NOT NULL,
    fk_medico BIGINT NOT NULL,
    fk_parroquia BIGINT NOT NULL,
    fk_tipo_centro_medico BIGINT NOT NULL,
    CONSTRAINT fk_medico_centro_medico FOREIGN KEY (fk_medico) REFERENCES MEDICO (id),
    CONSTRAINT fk_parroquia_centro_medico FOREIGN KEY (fk_parroquia) REFERENCES PARROQUIA (id),
    CONSTRAINT fk_tipo_centro_medico_centro_medico FOREIGN KEY (fk_tipo_centro_medico) REFERENCES TIPO_CENTRO_MEDICO (id),
    CONSTRAINT pk_centro_medico PRIMARY KEY (id)
);

CREATE TABLE CASO (
    id BIGSERIAL NOT NULL,
    estado CHARACTER VARYING(64) NOT NULL,
    fecha_ingreso TIMESTAMP NOT NULL DEFAULT now(),
    fecha_recuperacion TIMESTAMP,
    fecha_fallecimiento TIMESTAMP,
    fk_medico BIGINT NOT NULL,
    fk_paciente BIGINT NOT NULL,
    fk_centro_medico BIGINT NOT NULL,
    CONSTRAINT fk_medico_caso FOREIGN KEY (fk_medico) REFERENCES MEDICO (id),
    CONSTRAINT fk_paciente_caso FOREIGN KEY (fk_paciente) REFERENCES PACIENTE (id),
    CONSTRAINT fk_centro_medico_caso FOREIGN KEY (fk_centro_medico) REFERENCES CENTRO_MEDICO (id),
    CONSTRAINT pk_caso PRIMARY KEY (id)
);