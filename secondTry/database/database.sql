drop database if exists magic_rol;
CREATE DATABASE magic_rol;

USE magic_rol;

CREATE TABLE Usuarios(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     nombre VARCHAR(255) NOT NULL,
     apellido VARCHAR(255) NOT NULL,
     correo_electronico VARCHAR(255) NOT NULL,
     PRIMARY KEY (id)
);

CREATE TABLE Links(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT, 
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT key_user FOREIGN KEY (user_id) REFERENCES Usuarios(id),
    PRIMARY KEY (id)
);