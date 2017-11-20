import React, { Component } from 'react';
import Recipe from './Recipe';
import style from './style';

class RecipeList extends Component {
    render() {
        let recipeNodes = this.props.data.map( recipe => {
            return(
                <Recipe
                    source={ recipe.source }
                    uniqueID={ recipe._id }
                    onRecipeDelete={ this.props.onRecipeDelete }
                    onRecipeUpdate={ this.props.onRecipeUpdate }
                    key={ recipe._id }>
                    { recipe.directions }
                </Recipe>
            );
        } );
        return(
            <div style={ style.recipeList }>
                { recipeNodes }
            </div>
        );
    }
}

export default RecipeList;
