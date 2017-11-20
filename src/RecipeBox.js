import React, { Component } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import style from './style';

class RecipeBox extends Component {
    constructor( props ) {
        super( props );
        this.state = { data: [] };

        this.loadRecipesFromServer = this.loadRecipesFromServer.bind( this );
        this.handleRecipeSubmit = this.handleRecipeSubmit.bind( this );
        this.handleRecipeDelete = this.handleRecipeDelete.bind( this );
        this.handleRecipeUpdate = this.handleRecipeUpdate.bind( this );

    }

    loadRecipesFromServer() {
        axios.get( this.props.url )
            .then( res => {
                this.setState( { 
                    data: res.data
                } );
            } )
            .catch( err => {
                console.error( 'Error getting recipes: ', err );
            } );
    }

    handleRecipeSubmit( recipe ) {
        let recipes = this.state.data;
        let newRecipes = recipes.concat( [recipe] );
        axios.post( this.props.url, recipe )
            .then( () => {
                this.loadRecipesFromServer();
            } )
            .catch( err => {
                console.error( 'Error submitting recipe: ', err );
            } );
    }

    handleRecipeDelete( id ) {
        axios.delete( `${this.props.url}/${id}` )
            .then( () => {
                this.loadRecipesFromServer();
            } )
            .catch( err => {
                console.error( 'Error deleting recipe: ', err );
            } );
    }

    handleRecipeUpdate( id, recipe ) {
        // send the recipe id and new data to our api
        axios.put( `${this.props.url}/${id}`, recipe )
            .then( () => {
                this.loadRecipesFromServer();
            } )
            .catch( err => {
                console.log( 'Error updating recipe: ', err );
            } )
    }

    componentDidMount() {
        this.loadRecipesFromServer();
    }

    render() {
        return (
            <div style={ style.recipeBox }>
                <h2 style={ style.source }>Recipes:</h2>
                <RecipeList
                    onRecipeDelete = { this.handleRecipeDelete }
                    onRecipeUpdate = { this.handleRecipeUpdate }
                    data = { this.state.data } />
                <RecipeForm onRecipeSubmit={ this.handleRecipeSubmit } />
            </div>
        )
    }
}

export default RecipeBox;
