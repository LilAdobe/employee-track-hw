DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE department (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE courses (
  id INT NOT NULL,
  course_title VARCHAR(30) NOT NULL,
  instructor_id INT,
  order_details TEXT,
  FOREIGN KEY (instructor_id) --
  REFERENCES instructors(id)
  ON DELETE SET NULL
);


INSERT INTO instructors(id, first_name, last_name ) VALUES 
(1, "Randy", "Savage");

INSERT INTO courses (id, course_title, instructor_id) VALUES
(1,"Advanced CSS",1), 
(2, "Introduction to Html",1);
