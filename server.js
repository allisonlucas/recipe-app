'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./model/recipes');
const dbCreds = require('./db_creds.js');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

const _dbCreds = dbCreds.cred;
console.log('creds: ', _dbCreds);
const mongoDB = _dbCreds;
mongoose.connect( mongoDB, { useMongoClient: true } )
const db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'MongoDB connection error:' ) );

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// To prevent errors from Cross Origin Resource Sharing, set headers to allow CORS with middleware like so:
app.use( function( req, res, next ) {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Credentials', 'true' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' );

    // and remove cacheing so we get the most recent recipes
    res.setHeader( 'Cache-Control', 'no-cache');
    next();
} );

router.get( '/', function( req, res ) {
    res.json( { message: 'API initialized' } );
} );

// add the /recipes route to /api router
router.route( '/recipes' )
    // retrieve all recipes from the database
    .get( function( req, res ) {
        // looks at our Recipes Schema
        Recipe.find( function( err, recipes ) {
            if( err )
                res.send( 'Error getting recipes: ', err );
            // responds with a json object of our database recipes
            res.json( recipes );
        } );
    } )
    
    // post new recipe to the database
    .post( function( req, res ) {
        var recipe = new Recipe();
        // body parser allows use of req.body
        recipe.source = req.body.source;
        recipe.directions = req.body.directions;
        recipe.save( function( err ) {
            if( err )
                res.send( 'Error adding recipe: ', err );
            res.json( { message: 'Recipe added to DB.' } );
        } );
    } );

// Add a route to a specific recipe based on the database ID
router.route( '/recipes/:recipe_id' )
    // The put method allows a recipe to be updated based on the ID passed to the route
    .put( function( req, res ) {
        Recipe.findById( req.params.recipe_id, function( err, recipe ) {
            if( err )
                res.send( `Error finding recipe ${req.params.recipe_id}: ${err}` );
            // Set changed data. If nothing was changed do not alter the field.
            ( req.body.source ) ? recipe.source = req.body.source : null;
            ( req.body.directions ) ? recipe.directions = req.body.directions : null;
            // Save recipe
            recipe.save( function( err ) {
                if( err )
                    res.send( `Error updating recipe ${req.params.recipe_id}: ${err}` );
                res.json( { message: 'Recipe has been updated' } );
            } );
        } );
    } )

    // Delete method for removing a recipe from DB
    .delete( function( req, res ) {
        // Select the recipe by ID, then remove it
        Recipe.remove( { _id: req.params.recipe_id }, function( err ) {
            if( err )
                res.send( `Error deleting recipe ${req.params.recipe_id}: ${err}` );
            res.json( { message: 'Recipe has been deleted.' } );
        } );
    } );

app.use( '/api', router );

app.listen( port, function() {
    console.log( `API running on port ${port}` );
} );
