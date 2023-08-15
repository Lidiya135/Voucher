const Pool = require("./../config/db");

const create = (data) => {
    const {email,password,fullname,role} = data;
    return new Promise ((resolve,reject)=>
    Pool.query(`INSERT INTO users(email,password,fullname,role) VALUES('${email}','${password}','${fullname}','${role}')`,(err,result)=>{
    if(!err){
         resolve(result)
    } else {
        reject(err)
    }
}))
};

const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
    Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
    if(!err){
        resolve(result)
    } else {
        reject(err)
    }
}))
};

const getUserById = (id) =>{
    // console.log(id,"my id model")
    return Pool.query(`SELECT * FROM users WHERE id = '${id}'`)
   
}


module.exports = {create, findEmail, getUserById}