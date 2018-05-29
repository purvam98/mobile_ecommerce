INSERT INTO category (category_name) VALUES ('samsung');
INSERT INTO category (category_name) VALUES ('apple');
INSERT INTO category (category_name) VALUES ('htc');
INSERT INTO category (category_name) VALUES ('lg');
INSERT INTO product_details (product_name, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('galaxy note 8', 900.00, 'turkwise', 64, 'Infinity Screen:Multi-Tasking:Intelligent S Pen:Dual Camera:Battery + Quick Charging:Dust & Water Resistant:Security:Bixby Vision:64GB Internal Memory:Bluetooth 5.0:Android™ 8.0:Qualcomm® Snapdragon™ 835 Processor:Wireless Charging', '0000-00-00 00:00:00',(SELECT categoryID from category WHERE category_name='samsung'));
INSERT INTO product_details (product_name, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('galaxy s8', 600.00, 'urnge', 64, 'Infinity Screen:12MP Rear-Facing Camera:8MP Front Facing Camera:Water & Dust Resistance:Android™ 8.0:Samsung Smart Switch™:Bluetooth 5.0:Face Scanner:Iris Security Scanner:Fingerprint Scanner:
Bixby:64GB Internal Memory:Qualcomm® Snapdragon™ 835 Processor:Wireless Charging', '0000-00-00 00:00:00', (SELECT categoryID from category WHERE category_name='samsung'));
INSERT INTO product_details (product_name, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('Samsung Galaxy S9+', 840.00, 'blew', 64, '6.2” QHD Super AMOLED Display:8MP Front Facing Camera:Super Slow Motion Video Capture:Dual Camera:Dolby Atmos Stereo Speakers:Intelligent Scan:4K Video Capture:Expandable Memory up to 400 GB:6 GB RAM Internal Memory, 64 GB ROM Storage:Fast Wireless Charging:Android™ 8.0:Dual 12MP Rear Facing Camera:Long Lasting 3500 mAh Battery', '0000-00-00 00:00:00', (SELECT categoryID from category WHERE category_name='samsung'));
INSERT INTO product_details (product_name, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('Apple iPhone X', 999.99, 'gold encrusted diamond with glitter', 256, '5.8" Super Retina HD Display:Multi-Tasking:Splash, Water, and Dust Resistant:A11 Cyborg Chip:iOS 11:Bluetooth 5.0:12MP Wide-Angle and Telephoto Cameras:7MP FaceTime HD Camera:Face ID:Bluetooth 5.0:Wireless Charging', '0000-00-00 00:00:00', (SELECT categoryID from category WHERE category_name='apple'));
INSERT INTO product_details (product_name, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('Apple iPhone 8', 699.99, 'virtual rainbow', 256, '4.7" eyeball HD Display:12MP Camera:7MP FaceTime HD Camera:Wireless Charging:skynet - Your intelligent assistant:Bluetooth 5.0:A11 Bionic Chip:Touch ID:
iOS 11', '0000-00-00 00:00:00', (SELECT categoryID from category WHERE category_name='apple'));
INSERT INTO product_details (product_name, product_price, product_color, product_memory, product_specs, product_timestamp, categoryID) VALUES ('LG V30', 900.00, 'scrimple mc color', 64, '600MHz Device:Long-lasting Beautiful Design:Does the thinking for you:Dual Camera:E Nygma:32-Bit Hi-Fi Quad DAC:Qualcomm® Snapdragon™ 835 Processor:64GB Internal Memory:Gigabit Class LTE', '0000-00-00 00:00:00', (SELECT categoryID from category WHERE category_name='lg'));
