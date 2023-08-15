import axios from "axios";
import swal from "sweetalert";

export const  loginUserc = (data,navigate) => async (dispact) =>{
    try{
        dispact({type:"USER_CUSTOMER_LOGIN_PENDING"})
        const result = await axios.post("http://localhost:3009/user/login", data)
        const userc = result.data.data
        console.log(userc,"actionlogin")
        localStorage.setItem("token",userc.token)
        localStorage.setItem("id",userc.id)
        dispact({type:"USER_CUSTOMER_LOGIN_SUCCESS",payload: userc})
        swal("Success", "Login customer success", "success")
        navigate('/beranda')
        console.log("user customer login success")
    } catch(err){
        console.log("user customer login err")
        console.log(err)
        swal("Warning", "Login customer failed", "error");
    }
}