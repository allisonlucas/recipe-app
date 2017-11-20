'use strict';

// import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipesSchema = new Schema( {
    source: String,
    directions: Array
} );

// export module to use in server.js
module.exports = mongoose.model( 'Recipe', RecipesSchema);
