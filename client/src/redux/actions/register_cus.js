import axios from "axios";
import swal from "sweetalert";

export const  registerUserC = (data,navigate) => async (dispact) =>{
    try{
        dispact({type:"REGISTER_CUSTOMER_LOGIN_PENDING"})
        const result = await axios.post("http://localhost:3009/user/register/customer",data)
        const userc = result.data.data
        dispact({type:"USER_CUSTOMER_REGISTER_SUCCESS",payload: userc})
        swal("Success", "Register customer success", "success")
        navigate('/loginCustomer')
        console.log("user customer register success")
    } catch(err){
        console.log("user customer register err")
        console.log(err)
        swal("Warning", "Register customer failed", "error");
    }
}