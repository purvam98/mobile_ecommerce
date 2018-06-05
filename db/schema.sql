### Schema

CREATE DATABASE commerce_db;
USE commerce_db;

CREATE TABLE users
(
	userID int NOT NULL AUTO_INCREMENT,
	first_name varchar(255),
	last_name varchar(255),
	user_email varchar(255) NOT NULL,
	user_phone varchar(255),
	user_address text NOT NULL,
	user_zipcode int(5) NOT NULL,
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
	product_name varchar(255) NOT NULL,
	product_image text,
	product_price DECIMAL(6,2) NOT NULL,
	product_color varchar(255),
	product_memory varchar(255),
	product_specs text,
	product_timestamp TIMESTAMP NOT NULL,
	categoryID int NOT NULL,
	FOREIGN KEY (categoryID) REFERENCES category(categoryID),
	PRIMARY KEY (productID)
);

CREATE TABLE order_details
(
	orderID int NOT NULL AUTO_INCREMENT,
	order_timestamp TIMESTAMP NOT NULL,
	delivery_timestamp TIMESTAMP,
	payment_type varchar(255),
	userID int,
	FOREIGN KEY (userID) REFERENCES users(UserID),
	PRIMARY KEY (orderID)
);

CREATE TABLE order_product_details
(
	opID int NOT NULL AUTO_INCREMENT,
	orderID int NOT NULL,
	FOREIGN KEY (orderID) REFERENCES order_details(orderID),
	categoryID int NOT NULL,
	FOREIGN KEY (categoryID) REFERENCES category(categoryID),
	productID int NOT NULL,
	FOREIGN KEY (productID) REFERENCES product_details(productID),
	product_name varchar(255),
	quantity int(10) NOT NULL,
	PRIMARY KEY (opID)
);
