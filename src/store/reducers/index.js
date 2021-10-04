import authReducer from './authReducer';
import bookReducer from './bookReducer';
import { combineReducers } from 'redux';
import { firebaseReducer  } from 'react-redux-firebase';

const reducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    firebase: firebaseReducer
})

export default reducer;