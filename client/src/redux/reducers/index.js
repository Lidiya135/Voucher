import { combineReducers } from "redux";
import userReducers from './user'
import usercReducers from './userc'

const rootReducers =  combineReducers({
    user: userReducers,
    userc: usercReducers
})

export default rootReducers