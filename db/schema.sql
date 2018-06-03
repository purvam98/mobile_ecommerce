### Schema

CREATE DATABASE commerce_db;
USE commerce_db;

CREATE TABLE users
(
	userID int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL UNIQUE,
	password char(76) NOT NULL,
	first_name varchar(255),
	last_name varchar(255),
	user_email varchar(255) NOT NULL UNIQUE,
	user_phone varchar(255) UNIQUE,
	user_address text NOT NULL,
	user_zipcode varchar(255) NOT NULL,
	PRIMARY KEY (userID)
);


CREATE TABLE category
(
	categoryID int NOT NULL AUTO_INCREMENT,
	category_name varchar(255) NOT NULL,
	PRIMARY KEY (categoryID)
);

CREATE TABLE product_details
(
	productID int NOT NULL AUTO_INCREMENT,
	categoryID int NOT NULL,
	product_name varchar(255) NOT NULL,
	product_image text,
	product_price DECIMAL(6,2) NOT NULL,
	product_color varchar(255),
	product_memory varchar(255),
	product_specs text,
	product_timestamp TIMESTAMP NOT NULL,
	FOREIGN KEY (categoryID) REFERENCES category(categoryID),
	PRIMARY KEY (productID)
);

CREATE TABLE orders 
(
	orderID int NOT NULL AUTO_INCREMENT,
	userID int NOT NULL,
	order_timestamp TIMESTAMP NOT NULL,
	productID int NOT NULL,
	payment_type varchar(255),
	FOREIGN KEY (productID) REFERENCES product_details(productID),
	FOREIGN KEY (userID) REFERENCES users(UserID),
	PRIMARY KEY (orderID)
);