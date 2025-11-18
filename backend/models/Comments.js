import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    animeId:{ type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: String, 
    likes:Number, 
    dislikes: Number

})


export const CommentModel = ("comments",commentSchema,"comments")