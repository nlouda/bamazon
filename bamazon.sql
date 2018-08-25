DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(7,2) NOT NULL,
    stock_quantity INT(5) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Blue Bell Ice Cream", "Grocery", 3.59, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Hot Cheetos", "Grocery", 1.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Chocolate Chip Cookies", "Snacks", 3.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Water","Drinks", 3.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Coca-Cola", "Drinks", 3.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Notebooks", "Office Supplies", 1.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Shoes", "Clothing", 99.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Shirt", "Clothing", 20.19, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Socks", "Clothing", 5.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Shampoo", "Grocery", 1.99, 30);




