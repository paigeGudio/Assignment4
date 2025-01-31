// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
EmpSchema = new Schema({
    asin : String,
    title : String,
    stars:Number,
	reviews : Number,
    price : Number,
    listPrice:Number,
    categoryName:String,
    isBestSeller:String,
    boughtInLastMonth:Number
});
module.exports = mongoose.model('Product', EmpSchema);