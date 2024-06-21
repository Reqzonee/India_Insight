// src/redux/store.js
import { combineReducers } from '@reduxjs/toolkit';
import articleReducer from '../slices/articleSlice';
import cartReducer from '../slices/CartSlice'; // Import the cart reducer


const rootReducer = combineReducers({
    article: articleReducer,
    cart: cartReducer
});

export default rootReducer;

