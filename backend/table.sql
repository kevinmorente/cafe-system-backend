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
