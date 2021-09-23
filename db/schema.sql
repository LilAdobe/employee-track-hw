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
("Randy"),
("mike");

INSERT INTO role (title, salary, department_id)
VALUES
("Security", 23434, 1), 
("Master Chef", 23423, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("mike", "goodman", 2, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;