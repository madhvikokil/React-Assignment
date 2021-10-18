import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './store/reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ErrorBoundary from './Hoc/errorBoundary';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './fbConfig';

const store = createStore(reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, {attachAuthIsReady: true }), // redux binding for firebase
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <React.StrictMode>
          <App />
        </React.StrictMode>
        </ErrorBoundary>
    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
reportWebVitals();
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
