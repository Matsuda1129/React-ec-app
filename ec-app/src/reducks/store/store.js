import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import { createLogger } from 'redux-logger';
import {ProductsReducer} from '../products/reducers';
import {UsersReducer} from '../users/reducers';

export default function createStore(history) {

    const middleWares = [routerMiddleware(history), thunk, ]
    if (process.env.NODE_ENV === 'development'){
        const logger = createLogger({
            collapsed: true,
            diff: true
        })
        middleWares.push(logger)
    }
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            products: ProductsReducer,
            users: UsersReducer,
        }),
        applyMiddleware(
            ...middleWares
        )
    )
}