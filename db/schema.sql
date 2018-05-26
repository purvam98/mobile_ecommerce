### Schema

CREATE DATABASE commerce_db;
USE commerce_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255) NOT NULL,
	phone varchar(255),
	address text NOT NULL,
	zipcode varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE category
(
	c_id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255) NOT NULL,
	phone varchar(255),
	zipcode varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE phone_details
(
P_id int NOT NULL AUTO_INCREMENT,


);