import { combineReducers } from 'redux'

import { posts} from './posts'
import {Tags} from './tags'



export default combineReducers({
    posts,
    Tags
});