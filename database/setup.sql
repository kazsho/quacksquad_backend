DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS lendings;
DROP TABLE IF EXISTS borrower;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS tool;
DROP TABLE IF EXISTS token;


CREATE TABLE location(
    location_id INTEGER NOT NULL,
    post_code VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (location_id);
);


CREATE TABLE lendings(
    borrower_id INTEGER NOT NULL,
    tool_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY tool_id REFERENCES tool(tool_id),
    FOREIGN KEY borrower_id REFERENCES borrower(borrower_id);
);


CREATE TABLE borrower(
    borrower_id INTEGER NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    name TEXT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    PRIMARY KEY(borrower_id);
);


CREATE TABLE staff(
    staff_password VARCHAR(255) NOT NULL,
    staff_username VARCHAR(255) NOT NULL,
    staff_id VARCHAR(255) NOT NULL,
    PRIMARY KEY(staff_id);
);


CREATE TABLE tool(
    tool_id INTEGER NOT NULL,
    location_id INTEGER NOT NULL,
    tool_name VARCHAR(255) NOT NULL,
    price_per_day INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_URL VARCHAR(255) NOT NULL,
    status TEXT NOT NULL,
    PRIMARY KEY(tool_id), 
    FOREIGN KEY location_id REFERENCES location(location_id);
);



CREATE TABLE token(
    staff_id VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    token_id VARCHAR(255) NOT NULL,
    PRIMARY KEY(token_id),
    FOREIGN KEY staff_id REFERENCES staff(staff_id);
    );

