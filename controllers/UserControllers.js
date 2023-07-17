/** @format */

const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const createUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({where:{email:email}})
    if(!user)
    {
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            active: 1,
            sign_img: "testing"
          });
          let respon ={
              data:newUser,
              message:"Create Success ="+user
          }
          return res.status(201).json(respon)
    }else{
        let respon = {
            message:"User sudah ada"
        }
        res.status(403).json(respon)
    }

  } catch (err) {
    return res.status(500).json({error:err + "= Create User Error" })
  }
};

const getUsers = async(req,res,next)=>{
try {
  
  const users = await User.findAll()
  let respon = {
    data: users,
    message: "berhasil mendapatkan users"
  }

  res.status(200).json(respon)
} catch (error) {
  res.status(200).json({error:"Internal Server Get All User Eorror"})
}
}

const findUser = async(req,res,next)=>{
    
    const {email} = req.body

    const user = await User.findOne({where:{email:email}})
    if(!user){
    console.log(user)
    return res.json({message:"lanjut"})
    }else 
    {
     return res.json("sudah ada")
    }

}


module.exports = {createUser,getUsers,findUser}