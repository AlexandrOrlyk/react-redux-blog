import {ACTION_CHANGE_FIRST_NAME, ACTION_CHANGE_SECOND_NAME} from '../index'

export const initialState ={
    firstName: '',
    secondName: '',
   }; 
   
export const changeFirstName = (newFirstName) => {
    console.log(newFirstName)
    return {
        type: ACTION_CHANGE_FIRST_NAME,
        payload: newFirstName,
    }
}

export const changeSecondName =(newSecondName) => {
    console.log(newSecondName)
    return {
        type: ACTION_CHANGE_SECOND_NAME,
        payload: newSecondName,
    }
}
