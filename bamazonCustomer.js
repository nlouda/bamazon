const inquirer = require('inquirer');
const mysql = require('mysql');
//creating the connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3336,
    user: "root",
    password: "rootroot",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "displayItems",
                    type: "rawlist",
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Welcome to Bamazon where your purchases are imaginary and extraordinary. What would you like to purchase?",
                },
                {
                    name: "amount",
                    type: "input",
                    message: "how many do you need?"
                }
            ])
            .then(function (answer) {
                let chosenItem;
                for (let i = 0; i < results.length; i++) {
                    if (result[i].product_name === answer.displayItems) {
                        chosenItem = results[i];
                    }
                }
                if (chosenItem.stock_quantity < parseInt(answer.amount)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: stock_quantity - answer.amount
                        }, ],
                        function (error) {
                            if (error) throw err;
                            console.log("Order placed succesfully!!!");
                            start();
                        }
                    );
                } else {
                    console.log("Sorry, inventory is low. Try again...")
                    start();
                }
            });
    });
}