drop database if exists magic_rol;
CREATE DATABASE magic_rol;

USE magic_rol;

CREATE TABLE Usuarios(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     nombre VARCHAR(255) NOT NULL,
     apellido VARCHAR(255) NOT NULL,
     correo_electronico VARCHAR(255) NOT NULL UNIQUE,
     PRIMARY KEY (id)
);

CREATE TABLE ficha(
    id INT NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Alias VARCHAR(255) NOT NULL,
    Nivel INT(255) NOT NULL,
    Experiencia INT(255) NOT NULL,
    Fuerza VARCHAR(255) NOT NULL,
    Defensa VARCHAR(255) NOT NULL,
    Vitalidad VARCHAR(255) NOT NULL,
    Inteligencia VARCHAR(255) NOT NULL,
    Destreza VARCHAR(255) NOT NULL,
    Fe VARCHAR(255) NOT NULL,
    Carisma VARCHAR(255) NOT NULL,
    user_id INT, 
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT key_user FOREIGN KEY (user_id) REFERENCES Usuarios(id),
    PRIMARY KEY (id)
);