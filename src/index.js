import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import React, { Component } from 'react';
import{connect} from 'react-redux'
import {createStore, bindActionCreators} from 'redux'

const initialState ={
 firstName: '',
 secondName: '',
}; 

const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME'
const ACTION_CHANGE_SECOND_NAME = 'ACTION_CHANGE_SECOND_NAME'



const changeFirstName = (newFirstName) => {
    console.log(newFirstName)
    return {
        type: ACTION_CHANGE_FIRST_NAME,
        payload: newFirstName,
    }
}

const changeSecondName =(newSecondName) => {
    console.log(newSecondName)
    return {
        type: ACTION_CHANGE_SECOND_NAME,
        payload: newSecondName,
    }
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case ACTION_CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload}
        case ACTION_CHANGE_SECOND_NAME:
            return {...state, secondName: action.payload}
        default:
    }
  return  state;
}

const store = createStore(rootReducer)

class App extends Component {
  render() {
     
      const {  firstName, secondName, changeFirstName, changeSecondName} = this.props
    return (
      <div>
        <div>
            <input 
                type='text' 
                value={firstName} 
                placeholder='First Name'
                onChange={(event)=>{
                    changeFirstName(event.target.value);
                }}
            />
        </div>
        <div>
            <input 
                type='text' 
                value={secondName} 
                placeholder='Second Name' 
                onChange={(event)=>{
                    changeSecondName(event.target.value);
                }}
            />
        </div>
        <div>{firstName} {secondName}</div>
      </div>
    );
  }
}
const putStateToProps =(state) => {
        return {
            firstName: state.firstName,
            secondName: state.secondName,
        }
}

const mapDispatchProps =(dispatch)=>{
    return{
        changeFirstName: bindActionCreators(changeFirstName, dispatch),
        changeSecondName: bindActionCreators(changeSecondName, dispatch)
    }
}
const WrapperMainComponent = connect(putStateToProps, mapDispatchProps)(App)


ReactDOM.render(<Provider store={store}><WrapperMainComponent /></Provider>, document.getElementById('root'));

