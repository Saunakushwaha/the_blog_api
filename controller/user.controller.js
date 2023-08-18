const models =require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){
    
    models.user.findOne({where:{email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exist"
            });
        }else{
            bcryptjs.genSalt (10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err,hash){
                    const user ={
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                
                    models.user.create(user).then(result=>{ 
                        res.status(201).json({
                        "message":"user created successfully"
                        
                    });
                }).catch(error=>{
                    res.status(500).json({
                       "message": "Something went wrong"
                       
                    });
                  });
                });  
            });
        }
    }).catch();
}

function login(req, res)
{
    models.user.findOne({where:{email: req.body.email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!!"
            });
        }else
        {
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    },'secret',function(err, token){
                        res.status(200).json({
                            "message":"Authentication successful !!",
                            "token": token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "Invalid credentils!"
                    });
                }
            });
        }
    }).catch(error=>{
        res.status(500).json({
            "message": "Something went wrong"
          
         });
    });
    
}

module.exports ={
    signUp:signUp,
    login: login 
}