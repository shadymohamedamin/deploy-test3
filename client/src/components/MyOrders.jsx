import { QueryClientProvider, useQuery } from 'react-query';
import { QueryClient } from 'react-query/lib/core';
import moment from 'moment';
import styled from 'styled-components';
import * as React from 'react';
//import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { get_orders, update_orders } from '../../../features/orderSlice';
import axios from 'axios';
import DataTable from 'react-data-table-component';
const MyOrders = () => {
  const queryClient = new QueryClient({
    // Options
  });
  const auth=useSelector(state=>state.auth);
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent id={auth._id}/>
    </QueryClientProvider>
  );
};

const MyComponent = ({id}) => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  React.useEffect(()=>{
    if(id=="")navigate("/");
  },[]);
  const { data, isLoading, error } = useQuery('myOrders', async () => {
    const token=localStorage.getItem("token");
    const instance1 = axios.create({
      baseURL: 'https://online-shoooping.vercel.app/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //alert(id);
    const data=await instance1.post(`/api/products/get_orders/${id}`);
    //const response = await fetch('http://localhost:5000/api/orders/get_orders');
    //const data = await response.json();
    return data.data;
  });
  const {items}=useSelector(state=>state.order);
  //React.useEffect(()=>{
    //dispatch(get_orders());
  //},[items,dispatch]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const row=data&&data.map((item)=>{
    //console.log("row",item);
  return {
      id:item?._id,
      name:item?.shipping.name,
      amount:(item?.total/100).toLocaleString(),
      status:item?.delivery_status,
      dat:moment(item?.createdAt).fromNow()
      
  }
});
var columns=[
  {name:"ID",selector:row=>row.id,width:"29%"},
  {name:"Name",selector:row=>row.name,width:"18%",sortable:true},
  {name:"Amount",selector:row=>"$"+row.amount,width:"12%",sortable:true},
  {name:"Status",width:"13%",selector:row=>(
    <>
        {row?.status=="pending"?<Pending>Pending</Pending>:null}
        {row?.status=="delivered"?<Delivered>delivered</Delivered>:null}
        {row?.status=="dispatched"?<Dispatched>dispatched</Dispatched>:null}
    </>
  )},
  {name:'Date',selector:row=>row.dat,width:"14%",sortable:true},
  {name:'Actions',width:"30%",selector:row=>(
    <>
      <Actions>
      <View onClick={()=>navigate(`/order_details/${row?.id}`)}>View</View>
      </Actions>
    </>
  )}
];
//useNavigate=useNavigate

  /*const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 140},
    { field: 'amount', headerName: 'Amount($)', width: 100 },
    { field: 'status',headerName: 'Status',width: 100,
        renderCell:(params)=>{
            return (
                <>
                    {params?.row?.status=="pending"?<Pending>Pending</Pending>:null}
                    {params?.row?.status=="delivered"?<Delivered>delivered</Delivered>:null}
                    {params?.row?.status=="dispatched"?<Dispatched>dispatched</Dispatched>:null}
                </>
            )
        }
    },
    { field: 'dat',headerName: 'Date',width: 130,},
    { field: 'actions',headerName: 'Actions',sortable: false,width: 300
    ,renderCell:(params)=>{
        //console.log(params);<Edit_Product editProd={params.row}/>
        //onClick={()=>handle_dispatch(params?.row)}
        //onClick={()=>handle_delivered(params?.row)}
        //onClick={()=>navigate(`/order_details/${params?.row?.id}`)}
        return (
            
                <Actions>
                
                <View onClick={()=>navigate(`/order_details/${params?.row?.id}`)}>View</View>
                </Actions>
        )
    }
    },
  ];*/


  return (
    <>
    <Tit>My orders</Tit>
    <Conatiner>
        
    <div>
      {row.map((order) =>{
        console.log(order)
      })}

{row.map((order) =>{
        console.log(order)
      })}

      <div style={{ height: 500, width: '100%',overflow:'auto' }}>
          <DataTable
            data={row}
            columns={columns}
            selectableRows
            fixedHeader
            pagination
          />
      </div>
    </div>
    </Conatiner>
    </>
  );
};


const Tit=styled.h1`
display:flex;
justify-content:center;
align-items:center;
padding-top:1rem;
padding-bottom:3rem;
`
const ImageContainer=styled.div`
img{
    height:40px;
}
`
const Conatiner=styled.div`
display:flex;
justify-content:center;
align-items:center;

`//height:80vh;
//width:230vh;
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
}`

const Pending=styled.div`
padding:3px 5px;
color:rgb(253,181,40);
background-color:rgb(253,181,40,0.12);
border-radius:3px;
font-size:14px;
`;
const Dispatched=styled.div`
padding:3px 5px;
color:rgb(255,77,73);
background-color:rgba(255,77,73,0.12);
border-radius:3px;
font-size:14px;
`;

const Delivered=styled.div`
padding:3px 5px;
color:rgb(75, 112, 226);
background-color:rgba(75, 112, 226,0.12);
border-radius:3px;
font-size:14px;
`;
const DispatchedBtn=styled.button`
background-color:rgb(255,77,73);
`
const View=styled.button`
background-color:rgb(114,225,40);
`
const DeliveredBtn=styled.button`
background-color:rgb(102,108,255);
`


export default MyOrders;