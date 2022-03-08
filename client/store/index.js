import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import productsReducer from './products'
import singleProductReducer from './singleProduct'
import userReducer from "./user";
import cartReducer from './cart'

// rootReducer
const reducer = combineReducers({ 
  auth, 
  products: productsReducer,
  singleProduct: singleProductReducer,
  user: userReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'


// You created single user model which is account info
// you created the user.js file in store
// you added the single user api route
// updated the user model to include basic info like email, address, phone number
