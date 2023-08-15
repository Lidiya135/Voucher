import axios from "axios";
import swal from "sweetalert";

export const  registerUser = (data,navigate) => async (dispact) =>{
    try{
        dispact({type:"REGISTER_LOGIN_PENDING"})
        const result = await axios.post("http://localhost:3009/user/register/admin",data)
        const user = result.data.data
        dispact({type:"USER_REGISTER_SUCCESS",payload: user})
        swal("Success", "Register toko success", "success");
        navigate('/loginAdmin')
        console.log("user register success")
    } catch(err){
        console.log("user register err")
        console.log(err)
        swal("Warning", "Register toko failed", "error");
    }
}