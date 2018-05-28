### Schema

CREATE DATABASE commerce_db;
USE commerce_db;

CREATE TABLE users
(
	userID int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	first_name varchar(255),
	last_name varchar(255),
	user_email varchar(255) NOT NULL,
	user_phone varchar(255),
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
	categoryID int,
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

CREATE TABLE order_details
(
	orderID int NOT NULL AUTO_INCREMENT,
	userID int,
	productID int,
	order_timestamp TIMESTAMP NOT NULL,
	delivery_timestamp TIMESTAMP,
	payment_type varchar(255),
	FOREIGN KEY (productID) REFERENCES product_details(productID), 
	FOREIGN KEY (userID) REFERENCES users(UserID),
	PRIMARY KEY (orderID)
);

CREATE TABLE order_product_details
(
	opID int NOT NULL AUTO_INCREMENT,
	orderID int,
	categoryID int,
	productID int,
	quantity int NOT NULL,
	FOREIGN KEY (orderID) REFERENCES order_details(orderID),
	FOREIGN KEY (categoryID) REFERENCES category(categoryID),
	FOREIGN KEY (productID) REFERENCES product_details(productID),
	PRIMARY KEY (opID)
);