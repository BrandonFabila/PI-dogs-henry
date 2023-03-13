import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducer/index.js'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  //conecta la extension del navegador con reduxdevtloos


export const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//poder hacer peticiones a un server
);
