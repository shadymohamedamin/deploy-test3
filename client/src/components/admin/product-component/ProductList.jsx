//import React from 'react'

/*export default function ProductList() {
  return (
    <div>ProductList</div>
  )
}*/
import styled from 'styled-components';
import * as React from 'react';
//import { DataGrid } from '@mui/x-data-grid';
import { QueryClientProvider, useQuery } from 'react-query';
import { QueryClient } from 'react-query/lib/core';


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { insert, productsDelete } from '../../../features/productSlice';
import { useEffect,useState } from 'react';
import { getTotal, removeFromCart } from '../../../features/cartSlice';
import EditProduct from './EditProduct';
import Edit_Product from './EditProduct';
import { toast } from 'react-toastify';
import axios from 'axios';
import DataTable from 'react-data-table-component';
const App = () => {
  const queryClient = new QueryClient({
    // Options
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
};
const MyComponent = () => {
  const [idd,setIdd]=useState("");
  const prod=useSelector(state=>state.product);
    const cart=useSelector(state=>state.cart);
    const navigate=useNavigate();
    const dispatch=useDispatch();
  const [pprod,setPprod]=useState({});
  const { data, isLoading, error } = useQuery('myOrders', async () => {
    const token=localStorage.getItem("token");
    const instance1 = axios.create({
      baseURL: 'https://online-shoping-eta.vercel.app/',//'http://localhost:5000/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data=await instance1.get('/get');
    //const response = await fetch('http://localhost:5000/api/orders/get_orders');
    //const data = await response.json();
    return data.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

    //var {items}=useSelector(state=>state.product);
    
    const handle_increase=async(product)=>{
      /**/
      //alert("e")
      const token=localStorage.getItem("token");
      //alert("old_product._id")
        const instance = axios.create({
            baseURL: 'https://online-shoping-eta.vercel.app/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //alert(values.value.length)
        const result=await  instance.post(`https://online-shoping-eta.vercel.app/api/users/increase_product_quantity/${product.id}`);

      if(result.status==200)toast.info("quantity increased successfully");
      else toast.error("error occured");
    }
    const handle_decrease=async(product)=>{
      if(product.product_quantity==0)
      {
        toast.error("the product quantity is zero");
        return;
      }
      const token=localStorage.getItem("token");
      //alert("old_product._id")
        const instance = axios.create({
            baseURL: 'https://online-shoping-eta.vercel.app/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //alert(values.value.length)
        const result=await  instance.post(`https://online-shoping-eta.vercel.app/api/users/decrease_product_quantity/${product.id}`);
        console.log(result);
       
      if(result.status==200)toast.info("quantity decreased successfully");
      else toast.error("error occured");
    }
    
    //console.log("items: ",items);
  


    //useEffect(()=>{
      
    //},[dispatch,items]);
    const handleDelete=(prod)=>{
      dispatch(productsDelete(prod.id));
      setPprod(prod);
    }
    
    /*****useEffect(()=>{
      if(prod.deleteStatus=="success"&&pprod)
      {
        ////////////////
        const newProduct={
          name:pprod.pName,
          brand:pprod.pBrand,
          desc:pprod.pDesc,
          price:pprod.pPrice,
          id:pprod.id,
          sr:pprod.image,
          product_quantity:pprod.product_quantity?pprod.product_quantity:0,
          sold:pprod.sold?pprod.sold:0
        }
        dispatch(removeFromCart(newProduct));
        //prod.deleteStatus="";
        setPprod({});
      }
    },[prod.deleteStatus,prod.updateStatus,dispatch]);
    useEffect(()=>{
      dispatch(getTotal());
    },[cart.items]);*/
    console.log("data",data);
    var row=data&&data.map((item)=>{
      return {
          id:item._id,
          image:item?.sr?.secure_url,
          pName:item.name,
          pBrand:item.brand,
          pDesc:item.desc,
          pPrice:item?.price?.toLocaleString(),
          product_quantity:item?.product_quantity,
          sold:item.sold?item.sold:0
      }
  });
  var columns=[
    {name:"ID",selector:row=>row.id,width:"22%"},
    {name:"Image",width:"8%",selector:row=>(<ImageContainer><img src={row.image}></img></ImageContainer>)},
    {name:"Name",selector:row=>row.pName,width:"8%",sortable:true},
    {name:"Price",selector:row=>"$"+row.pPrice,width:"8%",sortable:true},
    {name:"Description",selector:row=>row.pDesc,width:"13%",sortable:true},
    {name:"Quantity",width:"10%",selector:row=>(
      <>
          <But onClick={(e)=>handle_decrease(row)}>-</But>
          <span> {row.product_quantity?row.product_quantity:0} </span>
          <But onClick={(e)=>handle_increase(row)}>+</But>
      </>
    )},
    {name:'Sold',selector:row=>row.sold,width:"8%",sortable:true},
    {name:'Actions',width:"30%",selector:row=>(
      <>
        <Actions>
            <Delete onClick={()=>handleDelete(row)}>Delete</Delete>
            <Edit_Product editProd={row}/>
            <View onClick={()=>navigate(`/product_details/${row.id}`)}>View</View>
        </Actions>
      </>
    )}
  ];
  /*var columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'image', headerName: 'Image', width: 80 
        ,renderCell:(params)=>{
            return (
                <ImageContainer>
                <img src={params.row.image}></img>
                </ImageContainer>
            )
        }
    },
    { field: 'pName', headerName: 'Name', width: 130 },
    { field: 'pPrice',headerName: 'Price',width: 80,},
    { field: 'pDesc',headerName: 'Description',width: 140,},
    { field: 'product_quantity',headerName: 'Quantity',width: 110,renderCell:(params)=>{
      //alert(params.row.id);
      return (
        <>
          <But onClick={(e)=>handle_decrease(params.row)}>-</But>
          <div> {params.row.product_quantity?params.row.product_quantity:0} </div>
          <But onClick={(e)=>handle_increase(params.row)}>+</But>
          
        </>
      )
    }},
    { field: 'sold',headerName: 'Sold',width: 50,},
    { field: 'actions',headerName: 'Actions',sortable: false,width: 170
    ,renderCell:(params)=>{
        //console.log(params);
        return (
            <Actions>
              
                <Delete onClick={()=>handleDelete(params.row)}>Delete</Delete>
                <Edit_Product editProd={params.row}/>
                <View onClick={()=>navigate(`/product_details/${params.row.id}`)}>View</View>
                
            </Actions>
        )
    }
    },
  ];
    //const [rowss,setRowss]=useState([{}]);
    //const [columnss,setColumnss]=useState([{}]);
    
    useEffect(()=>{
      
        row=items&&items.map((item)=>{
        return {
            id:item.id,
            image:item.sr,
            pName:item.name,
            pBrand:item.brand,
            pDesc:item.desc,
            pPrice:item.price.toLocaleString(),
            product_quantity:item.product_quantity?item.product_quantity:0,
            sold:item.sold?item.sold:0
        }
    });
    //setRowss(row);
        columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'image', headerName: 'Image', width: 80 
            ,renderCell:(params)=>{
                return (
                    <ImageContainer>
                    <img src={params.row.image}></img>
                    </ImageContainer>
                )
            }
        },
        { field: 'pName', headerName: 'Name', width: 130 },
        { field: 'pPrice',headerName: 'Price',width: 80,},
        { field: 'pDesc',headerName: 'Description',width: 130,},
        { field: 'product_quantity',headerName: 'Quantity',width: 110,renderCell:(params)=>{
          return (
            <>
              <But onClick={(e)=>handle_decrease(params.row)}>-</But>
              <div> {params.row.product_quantity?params.row.product_quantity:0} </div>
              <But onClick={(e)=>handle_increase(params.row)}>+</But>
              
            </>
          )
        }},
        { field: 'sold',headerName: 'Sold',width: 50,},
        { field: 'actions',headerName: 'Actions',sortable: false,width: 170
        ,renderCell:(params)=>{
            //console.log(params);
            return (
                <Actions>
                    <Delete onClick={()=>handleDelete(params.row.id)}>Delete</Delete>
                    <Edit_Product />
                    <View onClick={()=>navigate(`/product_details/${params.row.id}`)}>View</View>
                    
                </Actions>
            )
        }
        },
      ];
      //setColumnss(columns);

    },[items,prod.updateStatus,prod.createStatus,prod.deleteStatus]);*/




    //console.log(items.length);

  return (
    <div style={{ height: 400, width: '100%' ,overflow:'auto'}}>
      <DataTable
        data={row}
        columns={columns}
        selectableRows
        fixedHeader
        pagination
      />
    </div>
  );
}


const ImageContainer=styled.div`
img{
    height:40px;
}
`
const But=styled.button`
cursor:pointer;
padding:0.3rem;
margin:0.3rem;
outline:none;
border:none;
color:white;
background:brown;

`

const Actions=styled.div`
width:100%;
display:flex;
justify-content:space-between;
button{
    border:none;
    outline:none;
    padding:3px 5px;
    color:white;
    border-radius:3px;
    cursor:pointer;
}

`

const Delete=styled.button`
background-color:rgb(255,77,73);
margin-right:20px;

`
const View=styled.button`
background-color:rgb(114,225,40);
margin-right:20px;
margin-left:20px;
`
export default App;
