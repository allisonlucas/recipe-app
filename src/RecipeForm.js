import React, { Component } from 'react';
import style from './style';

class RecipeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            source: '',
            directions: ''
        };

        this.handleSourceChange = this.handleSourceChange.bind( this );
        this.handleDirectionsChange = this.handleDirectionsChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
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

    handleSubmit(e) {
        e.preventDefault();
        let source = this.state.source.trim();
        let directions = this.state.directions.trim();
        if( !directions || !source ) {
            return;
        }
        this.props.onRecipeSubmit( { source: source, directions: directions } );
        this.setState( {
            source: '',
            directions: ''
        } );
    }

    render() {
        return(
            <form style={ style.recipeForm } onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Recipe Source'
                    style={ style.recipeFormSource }
                    value={ this.state.source }
                    onChange={ this.handleSourceChange } />
                <input
                    type='text'
                    placeholder='Recipe Directions'
                    style={ style.commentFormDirections }
                    value={ this.state.directions }
                    onChange={ this.handleDirectionsChange } />
                <input
                    type='submit'
                    style={ style.recipeFormPost }
                    value='Post' />
            </form>
        )
    }
}

export default RecipeForm;
