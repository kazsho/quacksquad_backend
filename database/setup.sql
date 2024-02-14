DROP TABLE IF EXISTS location CASCADE;
DROP TABLE IF EXISTS lending CASCADE;
DROP TABLE IF EXISTS borrower CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS tool CASCADE;
DROP TABLE IF EXISTS token CASCADE;


CREATE TABLE location(
    location_id INTEGER NOT NULL,
    post_code VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (location_id)
);

CREATE TABLE tool(
    tool_id INTEGER GENERATED ALWAYS AS IDENTITY,
    location_id INTEGER NOT NULL,
    tool_name VARCHAR(255) NOT NULL,
    price_per_day NUMERIC NOT NULL,
    description TEXT NOT NULL,
    image_URL VARCHAR(255) NOT NULL,
    status TEXT NOT NULL,
    PRIMARY KEY(tool_id), 
    FOREIGN KEY (location_id) REFERENCES location(location_id)
);

CREATE TABLE borrower(
    borrower_id INTEGER GENERATED ALWAYS AS IDENTITY,
    email_address VARCHAR(255) NOT NULL,
    name TEXT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    PRIMARY KEY(borrower_id)
);

CREATE TABLE lending(
    lending_id INTEGER GENERATED ALWAYS AS IDENTITY,
    borrower_id INTEGER NOT NULL,
    staff_id INTEGER, 
    tool_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY(lending_id),
    FOREIGN KEY (tool_id) REFERENCES tool(tool_id),
    FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

CREATE TABLE staff(
    staff_password VARCHAR(255) NOT NULL,
    staff_username VARCHAR(255) UNIQUE NOT NULL,
    staff_id INTEGER GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY(staff_id)
);

CREATE TABLE token(
    staff_id INTEGER NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    token_id INTEGER GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY(token_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
    );

INSERT INTO location (location_id, post_code, street_address) VALUES
(1, '12345', '123 Fake Street'),
(2, '54321', '456 Mock Avenue'), 
(3, '98765', '789 Fictional Boulevard');


INSERT INTO tool (location_id, tool_name, price_per_day, description, image_URL, status) VALUES
(1, 'Hammer', 10, 'A versatile tool for various tasks', 'https://cdn.pixabay.com/photo/2014/09/19/09/54/hammer-451987_1280.jpg', 'available'),
(2, 'Screwdriver Set', 8, 'Includes Phillips and flat-head screwdrivers', 'https://cdn.pixabay.com/photo/2015/01/22/20/48/screwdriver-608318_1280.jpg', 'available'),
(1, 'Wrench', 12, 'For tightening and loosening nuts and bolts', 'https://cdn.pixabay.com/photo/2012/02/22/20/02/tools-15539_1280.jpg', 'available'),
(1, 'Drill', 15, 'Power tool for drilling holes', 'https://cdn.pixabay.com/photo/2012/03/01/01/06/battery-19983_1280.jpg', 'available'),
(1, 'Screwdriver', 8, 'Includes Phillips and flat-head screwdrivers', 'https://cdn.pixabay.com/photo/2016/04/20/12/40/screwdriver-1341081_1280.jpg', 'not available'),
(1, 'Pliers', 9, 'For gripping, bending, and cutting', 'https://cdn.pixabay.com/photo/2015/11/07/15/15/pliers-1031974_1280.jpg', 'available'),
(1, 'Saw', 18, 'For cutting wood and other materials', 'https://cdn.pixabay.com/photo/2017/04/04/17/26/hacksaw-2202309_1280.jpg', 'available'),
(2, 'Paintbrush Set', 7, 'Various sizes for painting', 'https://cdn.pixabay.com/photo/2017/09/10/12/26/creativity-2735435_1280.jpg', 'available'),
(2, 'Tape Measure', 5, 'For measuring distances', 'https://cdn.pixabay.com/photo/2017/09/10/12/26/creativity-2735435_1280.jpg', 'available'),
(2, 'Spirit Level', 10, 'For determining horizontal and vertical lines', 'https://cdn.pixabay.com/photo/2015/12/07/11/01/building-1080599_1280.jpg', 'available'),
(2, 'Cordless Drill', 20, 'Battery-powered drill for convenience', 'https://cdn.pixabay.com/photo/2017/04/18/15/42/akkuschrauber-2239493_1280.jpg', 'available'),
(2, 'Socket Set', 14, 'For tightening and loosening nuts and bolts', 'https://cdn.pixabay.com/photo/2020/03/26/19/30/industrial-4971565_1280.jpg', 'available'),
(3, 'Hacksaw', 11, 'For cutting metal and plastic', 'https://cdn.pixabay.com/photo/2019/10/28/08/34/saw-4583696_1280.jpg', 'available'),
(3, 'Caulking Gun', 6, 'For applying caulk or sealant', 'https://dm.henkel-dam.com/is/image/henkel/loctite-us-seo-ht-caulk-gun-1?wid=1024&fit=crop%2C1&qlt=90&align=0%2C0', 'available'),
(3, 'Chisel Set', 9, 'For carving and shaping wood or metal', 'https://cdn.axminstertools.com/media/catalog/product/cache/6aa9e1e59bcc5998e1687ab5ba3e27a4/9/0/900197_xl.jpg', 'not available'),
(3, 'Staple Gun', 8, 'For fastening materials with staples', 'https://cdn.pixabay.com/photo/2021/12/11/07/37/tool-6862107_1280.jpg', 'available'),
(3, 'Utility Knife', 4, 'For cutting various materials', 'https://www.stanleytools.co.uk/EMEA/PRODUCT/IMAGES/HIRES/STHT10432-0/STHT10432-0_1.jpg?resize=530x530', 'available');