/********************************************************************************* * 
 * ITE5315 – Assignment 4 
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students. 
 * 
 * Name: Sherie Gudio Student ID: _N01477703__________ Date: 03/25/2024
 * 
 * ******************************************************************************
 **/

var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
 
var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Product = require('./models/product');
 
 
//get all employee data from db
app.get('/api/products', function(req, res) {
	Product.find()
        .then(products => {
            res.json(products); // return all products in JSON format
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// get a asin with ID of 1
app.get('/api/products/:asin', function(req, res) {
    let asin = req.params.asin;
    Product.findOne({ asin: asin })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


// create employee and send back all employees after creation
/**app.post('/api/employees', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	Employee.create({
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	}, function(err, employee) {
		if (err)
			res.send(err);
 
		// get and return all the employees after newly created employe record
		Employee.find(function(err, employees) {
			if (err)
				res.send(err)
			res.json(employees);
		});
	});

 
});*/

app.post('/api/products', function(req, res) {
    // create a new employee record
    Product.create({
        asin: req.body.asin,
        title: req.body.title,
        stars: req.body.stars,
		reviews: req.body.reviews,
		price: req.body.price,
		listPrice: req.body.listPrice,
		categoryName: req.body.categoryName,
		isBestSeller: req.body.isBestSeller,
		boughtInLastMonth: req.body.boughtInLastMonth
    })
    .then(product => {
        // return all the employees after newly created employee record
        return Product.find();
    })
    .then(products => {
        res.json(products);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});


// create products and send back all employees after creation
app.put('/api/products/:asin', function(req, res) {
    let asin = req.params.asin;
    let data = {
        asin: req.body.asin,
        title: req.body.title,
        stars: req.body.stars,
        reviews: req.body.reviews,
        price: req.body.price,
        listPrice: req.body.listPrice,
        categoryName: req.body.categoryName,
        isBestSeller: req.body.isBestSeller,
        boughtInLastMonth: req.body.boughtInLastMonth
    };

    Product.findByIdAndUpdate(asin, data, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.send('Successfully! Product updated - ' + product.title);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// delete a employee by id
app.delete('/api/products/:asin', function(req, res) {
    let asin = req.params.asin;
    Product.deleteOne({ asin: asin })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.send('Successfully! Product has been Deleted.');
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.listen(port);
console.log("App listening on port : " + port);