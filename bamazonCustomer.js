const inquirer = require('inquirer');
const mysql = require('mysql');
//creating the connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "bamazon_DB"
});


function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("Welcome to Bamazon")
        console.log("Where your purchases are imaginary and extraordinary.")
        for (let i = 0; i < results.length; i++) {
            console.log("Number ID: " + results[i].item_id + " Product: " + results[i].product_name + " Department: " + results[i].department_name + " Price: " + results[i].price, " Quantity in Stock: " + results[i].stock_quantity)
        }
        console.log(" ");

        inquirer
            .prompt([{
                    name: "purchaseItem",
                    type: "input",
                    message: "What would you like to purchase(Select by Number ID)?",
                    validate: function (value) {
                        if (isNaN(value) == false && parseInt(value) <= results.length && parseInt(value) > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    name: "amount",
                    type: "input",
                    message: "how many do you need?",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ])
            .then(function (answer) {
                let purchase = (answer.purchaseItem) - 1;
                let purchaseAmount = parseInt(answer.amount);
                let total = parseFloat(((results[purchase].price) * purchaseAmount).toFixed(2));

                if (results[purchase].stock_quantity >= purchaseAmount) {

                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: `${(results[purchase].stock_quantity - purchaseAmount)}`
                        }, {
                            item_id: purchase.item_id
                        }],
                        function (err) {
                            if (err) throw err;
                            console.log(`Your order was: ${results[purchase].name}, new quantity is ${results[purchase].stock_quantity-purchaseAmount}`, "\nOrder placed successfully! Your total is $" + total.toFixed(2) + ".")
                            restart();
                        })
                } else {
                    console.log("Sorry, inventory is low. Try again...")
                    restart();
                }

                function restart() {
                    inquirer.prompt([{
                        name: "response",
                        type: "confirm",
                        message: "Would you like to purchase a new item?"
                    }]).then(function (answer) {
                        if (answer.response) {
                            start();
                        } else {
                            console.log("Thank you for your purchase, have a great day!!");
                        }
                    })
                }
            });
    });
}
start();