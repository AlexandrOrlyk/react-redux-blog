import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import React from 'react';
import App from './components/App'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
)



export const ACTION_GET_POSTS = 'ACTION_GET_POSTS'
export const ACTION_EDIT_POST = "ACTION_EDIT_POST"
export const ACTION_ADD_POST = "ACTION_ADD_POST"
export const ACTION_DELETE_POST = "ACTION_DELETE_POST"

export const ACTION_GET_CATEGORIES = 'ACTION_GET_CATEGORIES'
export const ACTION_EDIT_CATEGORY = 'ACTION_EDIT_CATEGORY'
export const ACTION_ADD_CATEGORY = 'ACTION_ADD_CATEGORY'
export const ACTION_DELETE_CATEGORY = 'ACTION_DELETE_CATEGORY'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

