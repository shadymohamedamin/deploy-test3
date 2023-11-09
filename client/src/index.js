import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";

import productSlice, { insert } from './features/productSlice';
import {  productsApi, useGetAllProductsQuery } from './features/productApi';
import cartSlice, { getTotal } from './features/cartSlice'
import authSlice, { loadUser } from './features/authSlice';
import orderSlice from './features/orderSlice';
import userSlice from './features/userSlice';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store =configureStore({
  reducer:{
    product:productSlice,
    cart:cartSlice,
    auth:authSlice,
    order:orderSlice,
    user:userSlice,
    [productsApi.reducerPath]: productsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
  
})

store.dispatch(insert());
store.dispatch(getTotal());
store.dispatch(loadUser(null));

root.render(
  <Provider store={store}>
  <React.StrictMode>
        <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



