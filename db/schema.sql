DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);


CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) --
REFERENCES role(id)
ON DELETE SET NULL,
FOREIGN KEY (manager_id) --
REFERENCES employee(id)
ON DELETE SET NULL
);


INSERT INTO department (name)
VALUES 
("Management"),
("Distribution"),
("Security"),
("Logistics");

INSERT INTO role (title, salary, department_id)
VALUES
("CEO", 23434, 1),
("CFO", 10000, 4),
("COO", 10000, 3),
("Transport", 10000, 2),
("Head Of Security", 23423, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Mike", "Felix", 1, 1),
("Rafael", "Carter", 3, 1),
("Aaron", "Fuentes", 4, 1),
("Juan", "Azul", 5, 1),
("Ernest", "Carrillo", 2, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
