import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import socketReducer from '../reducers/socketReducer'

const rootReducer = combineReducers(
    {
        socket: socketReducer,
    });
const store = createStore(rootReducer, composeWithDevTools());

export default store
