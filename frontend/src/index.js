import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './dependencies/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'

// devTools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)
 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);