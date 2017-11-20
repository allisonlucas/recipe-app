import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './RecipeBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <RecipeBox
        url = 'http://localhost:3001/api/recipes' />, 
    document.getElementById('root')
);

registerServiceWorker();
