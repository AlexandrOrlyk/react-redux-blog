import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import React from 'react';
import App from './components/App'
import {createStore, applyMiddleware, compose} from 'redux'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './reducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
)



export const ACTION_GET_POSTS = 'ACTION_GET_POSTS'


ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

