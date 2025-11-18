import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    title:{type:String,required:true},
    genres:[String],
    rating: {type:Number,min:0,max:10},
    episodes: {type:Number,default:null},
    status:{
        type:String,
        enum: ["Plan to Watch","Watching","Completed","Dropped"],
        default: "Plan to Watch"
    },
    episodesWatched:{
        type:Number,
        default: 0,
    },
    image: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

})

const AnimeModel = mongoose.model("Anime", animeSchema, "anime");

export default AnimeModel