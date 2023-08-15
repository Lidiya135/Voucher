const initialState = {
    userc : {
        id:"",
        email:"",
        fullname:"",
        role:"",
        token:""
    },
    isLoading: false
}

const usercReducer = (state=initialState, action) =>{
    if(action.type === 'USER_CUSTOMER_LOGIN_PENDING'){
        return{
            ...state,
            isLoading : true
        } 
    } else if(action.type === 'USER_CUSTOMER_LOGIN_SUCCESS'){
        return{
            ...state,
            user:action.payload,
            isLoading : false
        } 
    } else {
        return state
    }
}

export default usercReducer