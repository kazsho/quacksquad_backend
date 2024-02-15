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

CREATE TABLE staff(
    staff_password VARCHAR(255) NOT NULL,
    staff_username VARCHAR(255) UNIQUE NOT NULL,
    staff_id INTEGER GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY(staff_id)
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

CREATE TABLE token(
    staff_id INTEGER NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    token_id INTEGER GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY(token_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
    );

INSERT INTO location (location_id, post_code, street_address) VALUES
(1, 'FL21 1HB', '123 Florin Street, Florin'),
(2, 'FL06 2AP', '456 Manor Street, Florin'), 
(3, 'FL01 5BT', '789 Station Road, Florin');

INSERT INTO staff (staff_username, staff_password) VALUES
('janedoe', '$2b$10$FgvME/rY2ZY8NI7rPgZ8UO6Mn0RNAnZdRaC4DEArC7PSfO/eZYgma'),
('johndoe', '$2b$10$Zea/8f53fZ4UMeKP4Ngn3utiumHGzZr43GRyUB6bIBsgX583XyFfC');


INSERT INTO tool (location_id, tool_name, price_per_day, description, image_URL, status) VALUES
(1, 'Hammer', 10, 'A versatile tool for various tasks, this hammer is a must-have in any toolbox. Whether you are driving nails into wood, breaking something apart, or shaping metal, this durable hammer gets the job done. Its sturdy construction and ergonomic handle provide excellent grip and control, reducing fatigue during extended use. From construction projects to home repairs, this hammer is a reliable companion for any task.', 'https://cdn.pixabay.com/photo/2014/09/19/09/54/hammer-451987_1280.jpg', 'Available'),
(2, 'Screwdriver Set', 8, 'This comprehensive screwdriver set is a cornerstone of any toolkit, offering a wide range of options for various tasks. From tightening screws on household fixtures to assembling furniture, this set has you covered. The set includes both Phillips and flat-head screwdrivers in multiple sizes, ensuring compatibility with different screw types. The comfortable grips and durable tips provide precise control and prevent slippage, making screwdriving tasks efficient and hassle-free.', 'https://cdn.pixabay.com/photo/2015/01/22/20/48/screwdriver-608318_1280.jpg', 'Available'),
(1, 'Wrench', 12, 'Perfect for tightening and loosening nuts and bolts, this wrench is a reliable tool for mechanics, plumbers, and DIY enthusiasts alike. Its adjustable jaw allows for a customized fit on various fasteners, reducing the need for multiple wrenches. The durable construction ensures long-lasting performance, while the ergonomic handle provides comfort during extended use. Whether you are working on automotive repairs or household plumbing, this wrench is an essential addition to your toolbox.', 'https://cdn.pixabay.com/photo/2012/02/22/20/02/tools-15539_1280.jpg', 'Available'),
(1, 'Drill', 15, 'Take your DIY projects to the next level with this versatile power drill. Whether you are drilling holes in wood, metal, or masonry, this drill delivers reliable performance every time. The variable speed settings allow you to match the speed to the task, while the ergonomic design ensures comfortable handling. With its compact size and lightweight construction, this drill is perfect for tight spaces and overhead work. From home renovations to professional construction projects, this drill is up to the challenge.', 'https://cdn.pixabay.com/photo/2012/03/01/01/06/battery-19983_1280.jpg', 'Available'),
(1, 'Screwdriver', 8, 'Similar to the screwdriver set, this individual screwdriver features both Phillips and flat-head tips for versatile use. Its ergonomic handle provides a comfortable grip and excellent control, making it ideal for precision work. The durable construction ensures long-term reliability, while the magnetic tip securely holds screws in place during installation. Whether you are assembling furniture or performing electronic repairs, this screwdriver is a practical addition to any toolbox.', 'https://cdn.pixabay.com/photo/2016/04/20/12/40/screwdriver-1341081_1280.jpg', 'Unavailable'),
(1, 'Pliers', 9, 'These versatile pliers are designed to tackle a wide range of tasks, from gripping and bending to cutting various materials. The serrated jaws provide a secure grip on nuts, bolts, and wires, while the built-in wire cutter adds extra functionality. The ergonomic handle design ensures comfortable handling, reducing hand fatigue during prolonged use. Whether you are working on electrical installations, automotive repairs, or DIY projects, these pliers are an indispensable tool in your arsenal.', 'https://cdn.pixabay.com/photo/2015/11/07/15/15/pliers-1031974_1280.jpg', 'Available'),
(1, 'Saw', 18, 'For precise cutting of wood and other materials, this saw is a reliable choice for both amateur and professional woodworkers. The sharp blade and ergonomic handle provide excellent control and accuracy, whether you are making straight cuts or intricate curves. The sturdy construction ensures durability, while the lightweight design reduces hand fatigue during extended use. From carpentry projects to home renovations, this saw is an essential tool for any workshop.', 'https://cdn.pixabay.com/photo/2017/04/04/17/26/hacksaw-2202309_1280.jpg', 'Available'),
(2, 'Paintbrush Set', 7, 'With a variety of brush sizes and shapes, this paintbrush set is perfect for artists, hobbyists, and DIY enthusiasts alike. The high-quality bristles provide smooth and even coverage, ensuring professional-looking results every time. The ergonomic handles offer comfortable grip and control, making painting sessions more enjoyable and less tiring. Whether you are working on canvas, wood, or walls, this paintbrush set is a versatile addition to your creative toolkit.', 'https://cdn.pixabay.com/photo/2017/09/10/12/26/creativity-2735435_1280.jpg', 'Available'),
(2, 'Tape Measure', 5, 'Accurate measurements are essential for any construction or DIY project, and this tape measure delivers precision and reliability. The durable case protects the tape from wear and tear, while the easy-to-read markings ensure accurate measurements every time. The locking mechanism holds the tape securely in place, allowing for hassle-free measuring. Whether you are measuring distances, widths, or heights, this tape measure is a must-have tool for any toolbox.', 'https://cdn.pixabay.com/photo/2017/09/10/12/26/creativity-2735435_1280.jpg', 'Available'),
(2, 'Spirit Level', 10, 'Ensure your projects are perfectly level and plumb with this reliable spirit level. The high-visibility vials provide accurate readings, while the sturdy construction ensures durability and long-term performance. The ergonomic design and non-slip grips make handling comfortable and secure, even in wet or dusty conditions. Whether you are hanging shelves, installing cabinets, or laying tiles, this spirit level is an essential tool for achieving professional results.', 'https://cdn.pixabay.com/photo/2015/12/07/11/01/building-1080599_1280.jpg', 'Available'),
(2, 'Cordless Drill', 20, 'Experience the freedom of cordless drilling with this versatile power tool. The rechargeable battery provides long-lasting performance, allowing you to work anywhere without being tethered to a power outlet. The variable speed settings and adjustable clutch offer precise control over drilling and driving tasks, while the ergonomic design ensures comfortable handling. Whether you are assembling furniture, installing fixtures, or building decks, this cordless drill is up to the challenge.', 'https://cdn.pixabay.com/photo/2017/04/18/15/42/akkuschrauber-2239493_1280.jpg', 'Available'),
(2, 'Socket Set', 14, 'Containing a comprehensive selection of sockets and accessories, this set is a must-have for any mechanic, technician, or DIY enthusiast. The sockets are made from high-quality chrome vanadium steel for durability and longevity, while the ratcheting mechanism provides smooth and efficient operation. The included carrying case keeps everything organized and portable, making it easy to take your tools on the go. Whether you are working on cars, motorcycles, or appliances, this socket set has you covered.', 'https://cdn.pixabay.com/photo/2020/03/26/19/30/industrial-4971565_1280.jpg', 'Available'),
(3, 'Hacksaw', 11, 'For precise cutting of metal and plastic materials, this hacksaw is a reliable tool for metalworkers, plumbers, and DIY enthusiasts. The sharp blade and sturdy frame provide stability and control, ensuring clean and accurate cuts every time. The ergonomic handle design offers comfortable grip and reduced hand fatigue during extended use. Whether you are cutting pipes, rods, or PVC, this hacksaw is an essential addition to your toolbox.', 'https://cdn.pixabay.com/photo/2019/10/28/08/34/saw-4583696_1280.jpg', 'Unavailable'),
(3, 'Caulking Gun', 6, 'Applying caulk or sealant is quick and easy with this caulking gun. The smooth trigger action and durable construction ensure precise application and long-term reliability. The ergonomic handle design provides comfortable grip and reduced hand fatigue during prolonged use. Whether you are sealing windows, filling gaps, or caulking joints, this caulking gun is an indispensable tool for any home improvement project.', 'https://dm.henkel-dam.com/is/image/henkel/loctite-us-seo-ht-caulk-gun-1?wid=1024&fit=crop%2C1&qlt=90&align=0%2C0', 'Available'),
(3, 'Chisel Set', 9, 'For carving and shaping wood or metal materials with precision, this chisel set is an essential tool for woodworkers, sculptors, and artisans. The set includes a variety of blade sizes and shapes for versatility and flexibility in your projects. The sturdy handles provide comfortable grip and control, ensuring accuracy and safety during use. Whether you are carving intricate designs or shaping rough surfaces, this chisel set is up to the task.', 'https://cdn.axminstertools.com/media/catalog/product/cache/6aa9e1e59bcc5998e1687ab5ba3e27a4/9/0/900197_xl.jpg', 'Unavailable'),
(3, 'Staple Gun', 8, 'Fastening materials with staples is quick and easy with this staple gun. The ergonomic design and lightweight construction make it comfortable to use for extended periods. The durable construction ensures long-term reliability, while the adjustable pressure settings allow for precise control over staple depth. Whether you are upholstering furniture, securing wires, or hanging decorations, this staple gun is a versatile tool for any DIY project.', 'https://cdn.pixabay.com/photo/2021/12/11/07/37/tool-6862107_1280.jpg', 'Available'),
(3, 'Utility Knife', 4, 'For cutting various materials with precision, this utility knife is a versatile tool for homeowners, craftsmen, and DIY enthusiasts. The sharp blade and retractable design provide safe and efficient cutting, while the ergonomic handle ensures comfortable grip and control. The built-in blade storage and quick-change mechanism make blade replacement quick and easy, saving you time and hassle. Whether you are opening packages, scoring drywall, or trimming materials, this utility knife is a practical addition to your toolbox.', 'https://www.stanleytools.co.uk/EMEA/PRODUCT/IMAGES/HIRES/STHT10432-0/STHT10432-0_1.jpg?resize=530x530', 'Available');