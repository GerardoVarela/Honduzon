CREATE DATABASE HONDUZON;
USE HONDUZON;

CREATE TABLE PREGUNTAS(
ID_PREGUNTA INT IDENTITY(1,1) NOT NULL,
PREGUNTA VARCHAR(300),
CONSTRAINT PK_PREGUNTA PRIMARY KEY (ID_PREGUNTA));

CREATE TABLE DEPARTAMENTO(
ID_DEPARTAMENTO INT IDENTITY(1,1) NOT NULL,
NOMBRE_DEPARTAMENTO NVARCHAR(200) NOT NULL,
CONSTRAINT PK_DEPARTAMENTO PRIMARY KEY (ID_DEPARTAMENTO)

);

CREATE TABLE CIUDAD(
ID_CIUDAD INT IDENTITY(1,1) NOT NULL,
	CIUDAD VARCHAR (200) NOT NULL,
	ID_DEPARTAMENTO INT NOT NULL,
	CONSTRAINT PK_CIUDAD PRIMARY KEY (ID_CIUDAD),
	CONSTRAINT FK_DEPARTAMENTO FOREIGN KEY (ID_DEPARTAMENTO) REFERENCES DEPARTAMENTO(ID_DEPARTAMENTO)
);

CREATE TABLE ADMINISTRADOR(
ID_ADMINISTRADOR INT IDENTITY(1,1) NOT NULL,
NOMBRE VARCHAR(200) NOT NULL,
APELLIDO VARCHAR (200) NOT NULL,
CORREO_ELECTRONICO VARCHAR(200) NOT NULL,
	TELEFONO VARCHAR(200) NOT NULL,
	CONTRASENA VARCHAR(200) NOT NULL,
	DIRECCION VARCHAR (200) NOT NULL,
	ID_CIUDAD INT,
	CONSTRAINT PK_ADMINISTRADOR PRIMARY KEY (ID_ADMINISTRADOR),
	CONSTRAINT FKA_CIUDAD FOREIGN KEY (ID_CIUDAD) REFERENCES CIUDAD (ID_CIUDAD)
)

CREATE TABLE [dbo].[Usuarios] (
	ID_USUARIO INT IDENTITY(1,1) NOT NULL,
	NOMBRE VARCHAR(200) NOT NULL,
	APELLIDO VARCHAR(200) NOT NULL,
	CORREO_ELECTRONICO VARCHAR(200) NOT NULL,
	TELEFONO VARCHAR(200) NOT NULL,
	CONTRASENA VARCHAR(200) NOT NULL,
	DIRECCION VARCHAR (200),
	RESPUESTA VARCHAR(200) NOT NULL,
	ID_DEPARTAMENTO INT,
	ID_CIUDAD INT,
	ID_PREGUNTA INT,
	CONSTRAINT PK_USUARIOS PRIMARY KEY (ID_USUARIO),
	CONSTRAINT FKZ_DEPARTAMENTO FOREIGN KEY (ID_DEPARTAMENTO) REFERENCES DEPARTAMENTO(ID_DEPARTAMENTO),
	CONSTRAINT FKU_CIUDAD FOREIGN KEY (ID_CIUDAD) REFERENCES CIUDAD (ID_CIUDAD),
	CONSTRAINT FKP_PREGUNTA FOREIGN KEY (ID_PREGUNTA) REFERENCES PREGUNTAS (ID_PREGUNTA)

);


CREATE TABLE [dbo].[Categoria](
	ID_CATEGORIA INT IDENTITY (1,1) NOT NULL,
	NOMBRE_CATEGORIA VARCHAR (200) NOT NULL,
	DESCRIPCION_CATEGORIA VARCHAR(200) NOT NULL,
	IMAGEN IMAGE,
	ID_ADMINISTRADOR INT DEFAULT 1,
	CONSTRAINT PK_CATEGORIA PRIMARY KEY (ID_CATEGORIA),
	CONSTRAINT FKC_ADMINISTRADOR FOREIGN KEY (ID_ADMINISTRADOR) REFERENCES ADMINISTRADOR(ID_ADMINISTRADOR)
)

CREATE TABLE [dbo].[Productos](
	ID_PRODUCTO INT IDENTITY(1,1) NOT NULL ,
	NOMBRE_PRODUCTO VARCHAR(200) NOT NULL ,
	DESCRIPCION_PRODUCTO VARCHAR (200) NOT NULL,
	CANTIDAD_PRODUCTO INT NOT NULL,
	CANTIDAD_PROD_VENDIDO INT,
	VALORACIONES INT,
	PRECIO FLOAT NOT NULL,
	ID_USUARIO INT,
	ID_CATEGORIA INT,
	IMAGEN IMAGE,
	CONSTRAINT PK_PRODUCTO PRIMARY KEY(ID_PRODUCTO),
	CONSTRAINT FKP_USUARIO FOREIGN KEY (ID_USUARIO) REFERENCES [dbo].[Usuarios](ID_USUARIO),
	CONSTRAINT FKP_CATEGORIA FOREIGN KEY (ID_CATEGORIA) REFERENCES [dbo].[Categoria](ID_CATEGORIA)

);

CREATE TABLE LISTA_DESEOS (
	ID_LISTA_DESEOS INT IDENTITY(1,1) NOT NULL,
	ID_PRODUCTO INT,
	ID_CATEGORIA  INT,
	CONSTRAINT PK_LISTA_DESEOS PRIMARY KEY (ID_LISTA_DESEOS),
	CONSTRAINT FKLD_PRODUCTO FOREIGN KEY (ID_PRODUCTO) REFERENCES PRODUCTOS(ID_PRODUCTO),
	CONSTRAINT FKLD_CATEGORIA FOREIGN KEY (ID_CATEGORIA) REFERENCES [dbo].[Categoria](ID_CATEGORIA)



);


INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Atlántida');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Choluteca');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Colón');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Comayagua');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Copán');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Cortés');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('El Paraíso');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Francisco Morazán');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Gracias a Dios');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Intibucá');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Islas de la Bahía');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('La Paz');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Lempira');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Ocotepeque');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Olancho');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Santa Bárbara');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Valle');
INSERT INTO DEPARTAMENTO(NOMBRE_DEPARTAMENTO) VALUES ('Yoro');


INSERT INTO  CIUDAD(CIUDAD,ID_DEPARTAMENTO) VALUES ('Tegucigalpa','8');
INSERT INTO  CIUDAD(CIUDAD,ID_DEPARTAMENTO) VALUES ('San Pedro Sula','6');
INSERT INTO  CIUDAD(CIUDAD,ID_DEPARTAMENTO) VALUES ('La Ceiba','1');
INSERT INTO  CIUDAD(CIUDAD,ID_DEPARTAMENTO) VALUES ('Comayagua','4');
INSERT INTO  CIUDAD(CIUDAD,ID_DEPARTAMENTO) VALUES ('El Progreso','18');
INSERT INTO  CIUDAD(CIUDAD,ID_DEPARTAMENTO) VALUES ('Choluteca','2');

INSERT INTO PREGUNTAS(PREGUNTA) VALUES ('¿Cuál fue el nombre de tu primer mascota?');
INSERT INTO PREGUNTAS(PREGUNTA) VALUES ('¿En que ciudad naciste?');
INSERT INTO PREGUNTAS(PREGUNTA) VALUES ('¿Cómo se llama tu tía favorita?');

SELECT * FROM dbo.Usuarios;

CREATE PROCEDURE SP_INSERTAR_USUARIO
@NOMBRE VARCHAR(200),
@APELLIDO VARCHAR(200),
@CORREO_ELECTRONICO VARCHAR(200),
@TELEFONO VARCHAR(200),
@DIRECCION VARCHAR (200),
@RESPUESTA VARCHAR (200),
@ID_DEPARTAMENTO INT,
@CONTRASENA VARCHAR(200),
@ID_CIUDAD INT,
@ID_PREGUNTA INT
AS
BEGIN 
	INSERT INTO dbo.Usuarios(
	NOMBRE ,
APELLIDO ,
CORREO_ELECTRONICO,
TELEFONO ,
DIRECCION,
RESPUESTA,
ID_DEPARTAMENTO ,
CONTRASENA ,
ID_CIUDAD ,
ID_PREGUNTA 
	) VALUES (
	@NOMBRE ,
@APELLIDO ,
@CORREO_ELECTRONICO,
@TELEFONO ,
@DIRECCION,
@RESPUESTA,
@ID_DEPARTAMENTO ,
@CONTRASENA ,
@ID_CIUDAD ,
@ID_PREGUNTA 
);
END

CREATE PROCEDURE SP_INSERTAR_CATEGORIA
@NOMBRE_CATEGORIA VARCHAR(200),
@DESCRIPCION_CATEGORIA VARCHAR(200),
@IMAGEN IMAGE
AS
BEGIN 
	INSERT INTO  [dbo].[Categoria] (
	NOMBRE_CATEGORIA,
	DESCRIPCION_CATEGORIA,
	IMAGEN
	) VALUES (
	@NOMBRE_CATEGORIA ,
@DESCRIPCION_CATEGORIA ,
@IMAGEN
);
END