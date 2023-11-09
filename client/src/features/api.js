//import { head } from "../../../backend/routes/register";

export const url="https://online-shoooping.vercel.app/api";

export const setHeaders=()=>{
    const headers={
        headers:{
            "x-auth-token":localStorage.getItem("token")
        }
    }
    return headers;
}