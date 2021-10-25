import authReducer from './authReducer';
import bookReducer from './bookReducer';
import orderReducer from './orderReducer';

import { combineReducers } from 'redux';
import { firebaseReducer  } from 'react-redux-firebase';

const reducer = combineReducers({
    auth: authReducer,
    book: bookReducer,
    order: orderReducer,
    firebase: firebaseReducer
})

export default reducer;