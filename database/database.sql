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
    nombre VARCHAR(255) NOT NULL,
    alias VARCHAR(255) NOT NULL,
    nivel INT(255) NOT NULL,
    experiencia INT(255) NOT NULL,
    fuerza VARCHAR(255) NOT NULL,
    defensa VARCHAR(255) NOT NULL,
    vitalidad VARCHAR(255) NOT NULL,
    inteligencia VARCHAR(255) NOT NULL,
    destreza VARCHAR(255) NOT NULL,
    fe VARCHAR(255) NOT NULL,
    carisma VARCHAR(255) NOT NULL,
    user_id INT, 
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT key_user FOREIGN KEY (user_id) REFERENCES Usuarios(id),
    PRIMARY KEY (id)
);