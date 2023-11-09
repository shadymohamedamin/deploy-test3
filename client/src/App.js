/*import React,{useEffect,useState} from 'react'
function App()
{
  //const [data,setData]=useState([{}]);
  //useEffect(()=>{
   // fetch("http://localhost:5000/api").then(res=>res.json()).then(res=>setData(res))},[]);
//{(typeof data.name=="undefined")?(<p>loading...</p>):(<p>{data.name}</p>)}

  
  return (
  
    <div>
       
       <div>shady mo</div>
    </div>
  )
}
export default App;*/



//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Navigate ,Router,Routes,Link, useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import { ToastContainer } from "react-toastify";
import Cart from './components/Cart'
import NotFound from './components/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { insert } from './features/productSlice';
import "react-toastify/dist/ReactToastify.css";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
import Dashbord from './components/admin/Dashbord';
import Products from './components/admin/products';//import Products from './components/admin/Products';
import Summary from './components/admin/summary';
import CreateProduct from './components/admin/CreateProduct';
import ProductList from './components/admin/product-component/ProductList';
import Order from './components/admin/Order';
import User from './components/admin/User';
import ProductDetails from './components/details/Product';
import UserProfile from './components/details/userProfile';
import OrderDetails from './components/details/Order';
import React, { useEffect, useState } from 'react';
import { get_user_products, loadUser, update_logout_status, update_user_products } from './features/authSlice';
import { updateCart,clearCart, get_products } from './features/cartSlice';
import { update_cart } from './features/cartSlice';
import ChoosePassword from './components/auth/ChoosePassword';
import ResetPassword from './components/auth/ResetPassword';
import RechangePassword from './components/auth/RechangePassword';
//import Dashbord from './components/admin/Dashbord';
import MyOrders from './components/MyOrders';
//import { GoogleMap,InfoWindowF, MarkerF,useJsApiLoader, useLoadScript  } from '@react-google-maps/api';
//import { LatLngBounds } from '@react-google-maps/core';
//import { Map, Marker } from 'react-google-maps';

function App() {
  //update user when clear and (remove up to zero)
  return (
  <>
  
  <div className="App">
      <ToastContainer />
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path='/'                     exact element={<Home/>            }/>
     <Route path='/cart'                 exact element={<Cart/>            }/>
     <Route path="/register"             exact element={<Register/>        }/>
     <Route path="/login"                exact element={<Login/>           }/>
     <Route path='/checkout-success'     exact element={<CheckoutSuccess/> }/>
     
        <Route path="/register"             exact element={<Register/>        }/>
        <Route path="/send-email"           exact element={<ResetPassword/>   }/>
        <Route path="/reset-password/:token" exact element={<RechangePassword/>   }/>
        <Route path="/login"                exact element={<Login/>           }/>
        <Route path="/enter-your-password"  exact element={<ChoosePassword/>           }/>
        <Route path="/product_details/:id"  exact element={<ProductDetails/>  }/>
        <Route path="/user_details/:id"     exact element={<UserProfile/>  }/>
        <Route path="/order_details/:id"    exact element={<OrderDetails/>  }/>
        <Route path='/my-orders'            exact element={<MyOrders/>            }/>

        <Route path="/admin"                 element={<Dashbord/>   }>
          <Route path="products"             element={<Products/>   }>
            <Route index element={<ProductList/>}/>
            <Route path="create-product"     element={<CreateProduct/>           }/>
          </Route>
          <Route path="summary"              element={<Summary/>    }/>
          <Route path="orders"               element={<Order/>    }/>
          <Route path="users"                element={<User/>    }/>
        </Route>
     <Route path='*'                           element={<NotFound/>        }/>
     </Routes>
     </BrowserRouter>
  </div>
  </>
  )

}
export default App;

  //const bounds = new CoreLatLngBounds(markers);
  
  /*const cart=useSelector(state=>state.cart);
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();


//how to store in cash in react
  useEffect(()=>{
    if(auth.loginStatus=="success")
    {
      //localStorage.setItem("cartItems",JSON.stringify(auth.products));
      //ids
      dispatch(get_products({id:auth._id}));
      //console.log
      //dispatch(updateCart(auth.products));
      //dispatch(update_user_products({id:auth._id,value:cart.items}));
    }
  },[auth.loginStatus]);
  useEffect(()=>{
    if(localStorage.getItem("clear")=="clear")
    {
      localStorage.setItem("clear","c");
      dispatch(clearCart());
    }
  },[localStorage.getItem("clear")])


  
  
  
  
  
  
  const sssss=0;
  return (
    <div className="App">
      <ToastContainer /> 
     <BrowserRouter>
     
      <Navbar/>
      
      <Routes>
        
        
        
        <Route path='/'                     exact element={<Home/>            }/>
        <Route path='/my-orders'            exact element={<MyOrders/>            }/>
        
        <Route path="/send-email"           exact element={<ResetPassword/>   }/>
        <Route path="/reset-password/:token" exact element={<RechangePassword/>   }/>
        
        <Route path="/enter-your-password"  exact element={<ChoosePassword/>           }/>
        <Route path="/product_details/:id"  exact element={<ProductDetails/>  }/>
        <Route path="/user_details/:id"     exact element={<UserProfile/>  }/>
        <Route path="/order_details/:id"    exact element={<OrderDetails/>  }/>
        
      </Routes>
 
     </BrowserRouter>
     
    </div>
  );
  
}

export default App;*/
