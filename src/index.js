import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import React from 'react';
import App from './components/MainComponent'
import {createStore} from 'redux'
import {rootReducer} from './store/reducers'



const store = createStore(rootReducer)

export const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME'
export const ACTION_CHANGE_SECOND_NAME = 'ACTION_CHANGE_SECOND_NAME'


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

