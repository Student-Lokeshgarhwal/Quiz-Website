require('dotenv').config()
const jwt = require('jsonwebtoken')

const setUser =async (user) => {
   return await jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.SECRET_KEY)

}

const getUser = async(token)=>{
return await jwt.verify(token,process.env.SECRET_KEY)
}

module.exports = {setUser,getUser}