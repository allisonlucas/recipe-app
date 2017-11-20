import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Recipe extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            toBeUpdated: false,
            source: '',
            directions: ''
        };
        // bind all functions to this class
        this.updateRecipe = this.updateRecipe.bind( this );
        this.handleRecipeUpdate = this.handleRecipeUpdate.bind( this );
        this.deleteRecipe = this.deleteRecipe.bind( this );
        this.handleSourceChange = this.handleSourceChange.bind( this );
        this.handleDirectionsChange = this.handleDirectionsChange.bind( this );
    }

    updateRecipe(e) {
        e.preventDefault();
        // bring up the update field when update link is clicked
        this.setState( {
            toBeUpdated: !this.state.toBeUpdated
        } );
    }

    handleRecipeUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        // if data changed, set it, else, leave null and PUT request will ignore it.
        let source = ( this.state.source ) ? this.state.source : null;
        let directions = ( this.state.directions ) ? this.state.directions : null;
        let recipe = { source: source, directions: directions };
        this.props.onRecipeUpdate( id, recipe );
        this.setState( {
            toBeUpdated: !this.state.toBeUpdated,
            source: '',
            directions: ''
        } );
    }

    deleteRecipe(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onRecipeDelete( id );
    }

    handleSourceChange(e) {
        this.setState( {
            source: e.target.value
        } );
    }

    handleDirectionsChange(e) {
        this.setState( {
            directions: e.target.value
        } );
    }

    rawMarkup() {
        let rawMarkup = marked( this.props.children.toString() );
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div style={ style.recipe }>
                <h3>{ this.props.source }</h3>
                <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                <a style={ style.updateLink } onClick={ this.updateRecipe }>
                update
                </a>
                <a style={ style.deleteLink } onClick={ this.deleteRecipe }>
                delete
                </a>
                { (this.state.toBeUpdated) ? (
                    <form onSubmit={ this.handleRecipeUpdate }>
                        <input
                            type='text'
                            placeholder='Update Source'
                            style={ style.recipeFormSource }
                            value={ this.state.source }
                            onChange= { this.handleSourceChange } />
                        <input
                            type='text'
                            placeholder='Update Directions'
                            style= { style.recipeFormDirections }
                            value={ this.state.directions }
                            onChange={ this.handleDirectionsChange } />
                        <input
                            type='submit'
                            style={ style.recipeFormPost }
                            value='Update' />
                    </form>
                ) : null }
            </div>
        );
    }
}

export default Recipe;
