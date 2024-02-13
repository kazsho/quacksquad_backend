CREATE TABLE "locations"(
    "location_id" INTEGER NOT NULL,
    "post_code" VARCHAR(255) NOT NULL,
    "street_address" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "locations" ADD PRIMARY KEY("location_id");
ALTER TABLE
    "locations" ADD PRIMARY KEY("post_code");
CREATE TABLE "lendings"(
    "borrower_id" INTEGER NOT NULL,
    "tool_id" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "active" BOOLEAN NOT NULL
);
CREATE TABLE "borrower"(
    "borrower_id" INTEGER NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "borrower" ADD PRIMARY KEY("borrower_id");
CREATE TABLE "staff"(
    "staff_password" VARCHAR(255) NOT NULL,
    "staff_username" VARCHAR(255) NOT NULL,
    "staff_id" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "staff" ADD PRIMARY KEY("staff_password");
CREATE TABLE "tools"(
    "tool_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "tool_name" VARCHAR(255) NOT NULL,
    "price_per_day" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_URL" VARCHAR(255) NOT NULL,
    "status" TEXT NOT NULL
);
ALTER TABLE
    "tools" ADD PRIMARY KEY("tool_id");
CREATE TABLE "token_id"(
    "staff_id" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "token_id" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "token_id" ADD PRIMARY KEY("staff_id");
ALTER TABLE
    "staff" ADD CONSTRAINT "staff_staff_id_foreign" FOREIGN KEY("staff_id") REFERENCES "token_id"("staff_id");
ALTER TABLE
    "lendings" ADD CONSTRAINT "lendings_tool_id_foreign" FOREIGN KEY("tool_id") REFERENCES "tools"("tool_id");
ALTER TABLE
    "lendings" ADD CONSTRAINT "lendings_borrower_id_foreign" FOREIGN KEY("borrower_id") REFERENCES "borrower"("borrower_id");
ALTER TABLE
    "tools" ADD CONSTRAINT "tools_location_id_foreign" FOREIGN KEY("location_id") REFERENCES "locations"("location_id");