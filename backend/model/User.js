const { mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  username:{type:String,required:true,unique:true},
})

// userSchema.pre('save',async function(next){
//   if (!this.isModified("password")) {     // if password is not modified then it will not rehash the password
//     next();
//   }
//   const salt = await bcrypt.genSalt(10)
//   this.password =await bcrypt.hash(this.password,salt)
//   next();
// })

// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const userModel = mongoose.model('User',userSchema)

module.exports = userModel;