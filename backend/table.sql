CREATE TABLE user(
    id int primary key AUTO_INCREMENT,
    NAME varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

INSERT INTO user(NAME,contactNumber,email,password,status,role) VALUES('admin','123123123','admin@admin.com','123','true','admin');

CREATE TABLE category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250),
    PRIMARY KEY (id)
);

CREATE TABLE product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key (id)
);

CREATE TABLE bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
);
