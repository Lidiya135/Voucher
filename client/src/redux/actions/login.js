import axios from "axios";
import swal from "sweetalert";

export const  loginUser = (data,navigate) => async (dispact) =>{
    try{
        dispact({type:"USER_LOGIN_PENDING"})
        const result = await axios.post("http://localhost:3009/user/login",data)
        const user = result.data.data
        localStorage.setItem("token",user.token)
        localStorage.setItem("id",user.id)
        dispact({type:"USER_LOGIN_SUCCESS",payload: user})
        swal("Success", "Login admin success", "success")
        navigate('/myProducts')
        console.log("user login success")
    } catch(err){
        console.log("user login err")
        console.log(err)
        swal("Warning", "Login toko failed", "error");
    }
}