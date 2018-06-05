INSERT INTO category (category_name) VALUES ('samsung');
INSERT INTO category (category_name) VALUES ('apple');
INSERT INTO category (category_name) VALUES ('htc');
INSERT INTO category (category_name) VALUES ('lg');
INSERT INTO product_details (product_name, product_image, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('galaxy note 8','note8',900.00, 'turkwise', 64, 'Infinity Screen:Multi-Tasking:Intelligent S Pen:Dual Camera:Battery + Quick Charging:Dust & Water Resistant:Security:Bixby Vision:64GB Internal Memory:Bluetooth 5.0:Android™ 8.0:Qualcomm® Snapdragon™ 835 Processor:Wireless Charging', now() ,(SELECT categoryID from category WHERE category_name='samsung'));
