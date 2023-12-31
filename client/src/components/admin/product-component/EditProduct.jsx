//export default function Edit_Product(){return (<></>)}
import * as React from 'react';
/*import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';*/
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsUpdate } from '../../../features/productSlice';
import { getTotal, removeFromCart } from '../../../features/cartSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//import { productsCreate } from '../../../features/productSlice';


export default function Edit_Product() {
    //console.log("edit: ",editProd);
    const [productImage,setProductImage]=useState("")//(editProd?.sr?.secure_url);
  const [name,setName]=useState("");
  const [price,setPrice]=useState("");
  //const [desc,setDesc]=useState("");
  const [brand,setBrand]=useState("");
  //const [global,setGlobal]=useState("");
  const [description,setDescription]=useState("");
  const [product_quantity,setProductQuantity]=useState("");
    const params=useParams();
    const [editProd,setEditProd]=useState({});
    useEffect(()=>{
      async function fetch_last(){
          //try{
          const token=localStorage.getItem("token");
          //console.log(token);
          const instance=axios.create({
              baseURL:"https://online-shoooping.vercel.app/",
              headers:{Authorization:`Bearer ${token}`}
          });
          const result=await instance.get(`/api/users/get_product/${params.id}`); 
          //console.log("transaction: ",result.data);
          //etEditProd(result.data);
          setName(result.data.name);
          setBrand(result.data.brand);
          //console.log("brand",brand);
          //console.log("see here",result.data);
          setDescription(result.data.desc);
          setProductImage(result.data.sr.secure_url);
          setProductQuantity(result.data.product_quantity);
          setPrice(result.data.price);
          //console.log("see here",editProd);
          /*const indexItem=cart.items.findIndex((element)=>(element.id===result.data._id));
          if(indexItem>=0&&cart.items[indexItem].quantity>=product.product_quantity||product.product_quantity==0)
          {
              sub_but.current.disabled=true;
              sub_but.current.style.background="gray";
          }
          console.log("product: ",result);
          }
          catch(err)
          {
              console.log(err);
          }*/
      
      }
      fetch_last();
},[]);
    
    const dispatch=useDispatch();
    //const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [pprod,setPprod]=useState({});

  //const handleDelete=(prod)=>{
    //dispatch(productsDelete(prod.id));
    //setPprod(prod);
  //}
  const prod=useSelector(state=>state.product);
  const cart=useSelector(state=>state.cart);
  useEffect(()=>{
    if(prod.updateStatus=="success"&&pprod)
    {
      ////////////////
      
      dispatch(removeFromCart(pprod));
      //prod.deleteStatus="";
      setPprod({});
    }
  },[prod.updateStatus,dispatch]);
  useEffect(()=>{
    dispatch(getTotal());
  },[cart.items]);



  
  
  
  //setName(editProd.name);
  //console.log("see here",name);
  const handle_product_image=(e)=>{
    const file =e.target.files[0];
    transform(file);
    //console.log(file);
  }
  //console.log(productImage);
  const transform=(file)=>{
    const reader=new FileReader();
    //console.log(file);
    if(file)
    {
      reader.readAsDataURL(file);
      
      reader.onloadend=async()=>{
        setProductImage(reader.result);
      }
    }
    else setProductImage("");
  }
  const [errorMessage,setErrorMessage]=useState("");
  
  const submit=(e)=>{
    e.preventDefault();
    //console.log(name,brand,price,description)
    if(isNaN(Number(price)))
    {
      setErrorMessage("the price feild should be number");
      return;
    }
    else setErrorMessage("");
    
    dispatch(productsUpdate({id:params.id,sr:productImage,name,brand,price,desc:description,product_quantity:product_quantity}));
    setPprod({id:params.id,name});
    console.log(pprod);
    
    //console.log({name,brand,description,productImage,price});
  }
  const product=useSelector(state=>state.product);






  return (
    <div>
      <Edit onClick={handleClickOpen}>
        Edit
      </Edit>
      
                <div className='create-product-form'>
            <form className='styledForm' onSubmit={submit}>
                <h3>Create product</h3>
                <input  className='inputs' type='file' accept='image/' onChange={handle_product_image} />
                <input value={name} className='inputs' type='text' placeholder='product name' required onChange={(e)=>setName(e.target.value) }/>
                <select value={brand} className='inputs' onChange={(e)=>setBrand(e.target.value) } required>
                  <option value="">Select Category</option>
                  <option value="phone">phone</option>
                  <option value="labtop">labtop</option>
                  <option value="smart watch">smart watch</option>
                  <option value="other">Other</option>
                    
                </select>
                <input value={price} className='inputs' type='text' placeholder='product price' required onChange={(e)=>setPrice(e.target.value) }/>
                
                <input value={product_quantity} className='inputs' type='number' placeholder='product quantity' required onChange={(e)=>setProductQuantity(e.target.value) }/>

                <input value={description} className='inputs' type='text' placeholder='product description' required onChange={(e)=>setDescription(e.target.value) }/>
                {product.updateStatus=="pending"?<button type='submit' className='primaryBut' disabled={true} style={{"background-color":"gray"}}>Waiting...</button>:<button type='submit' className='primaryBut' disabled={false}>Update</button>}
                {errorMessage?<div style={{"color":"red"}}>* {errorMessage}</div>:null}
                
            </form>
            
            <div className='imagePreview'>
                {productImage?<img src={productImage} ></img>:<p>Image preview will apear here!</p>}
                
            </div>
            </div>
        
    </div>
  );
}


const Edit=styled.button`
border:none;
outline:none;
padding:3px 5px;
color:white;
border-radius:3px;
cursor:pointer;
background-color:#4b70e2;
`;
