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




ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

