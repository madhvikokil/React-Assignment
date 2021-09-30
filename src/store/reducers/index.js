import authReducer from './authReducer';
import bookReducer from './bookReducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    auth: authReducer,
    book: bookReducer
})

export default reducer;