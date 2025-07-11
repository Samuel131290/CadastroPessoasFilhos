CREATE DATABASE turim_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE turim_db;

CREATE TABLE pessoa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE filho (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pessoa_id INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  FOREIGN KEY (pessoa_id) REFERENCES pessoa(id) ON DELETE CASCADE
);

SELECT * FROM pessoa;
SELECT * FROM filho;
