import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email:String,
    password:String
},{timestamps:true})


const UserModel = mongoose.model("User",UserSchema,"users")

export default UserModel