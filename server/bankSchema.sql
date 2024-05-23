CREATE DATABASE bank_db;

USE bank_db;

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(127) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       balance DECIMAL(15, 2) DEFAULT 0.00,
                       createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);