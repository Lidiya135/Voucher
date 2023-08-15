const {response} = require('../middleware/common');
const {create, findEmail, getUserById} = require('../models/user');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');
const {generateToken, genRefreshToken} = require('../helper/auth');
const modelUsers = require("../models/user");

const usersController = {
    insert: async  (req, res, next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        console.log('role',req.params.role)
        let role = req.params.role

        if(users){
            return response(res, 404, false, "email already use"," register fail") 
        }

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password ,
            fullname : req.body.fullname,
            role : req.params.role,
        }
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                response(res, 200, true, true, "register success")
            }
        } catch(err){
            console.log(err)
            response(res, 404, false, err," register fail")
        }
    },

    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete users.password
        let payload = {
            id: users.id,
            email: users.email,
            role: users.role
        }
        users.token = generateToken(payload)
        users.refreshToken = genRefreshToken(payload)
        response(res, 200, false, users,"login success")
    },

    getUser: (req, res, next) => {
        modelUsers.getUserById(req.params.id)
          .then((result) => {
            response(res, 200, true, result.rows, "get user success");
          })
          .catch((err) => response(res, 404, false, err, "get user fail"));
      },
}

exports.usersController = usersController;