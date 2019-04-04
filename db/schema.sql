CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers (
id INT(40) NOT NULL AUTO_INCREMENT,
burger_name VARCHAR(200),
devoured BOOLEAN,
PRIMARY KEY (id)
);

