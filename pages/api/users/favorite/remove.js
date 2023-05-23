import connectDB from "@/utilis/mongo";
import User from "@/models/users";

// get the list of movies from the user's favorites
export default async function handler(req, res){
    connectDB();
    const {method}=req;
    const {movieId,userId}=req.body;
    // console.log(method,id,movieId)
    // console.log(req.body)

    if(method !== 'PATCH'){
        return res.status(400).json({success: false});
    }

    try {
        const user=await User.findById(userId);

        const favorites=user.favorites;
        // remove a movie id from the favorites list
        const movieId=req.body.movieId;
        const index=favorites.indexOf(movieId);
        if(index>-1){
            favorites.splice(index,1);
        }
        user.favorites=favorites;
        await user.save();
        res.status(200).json({success: true,user});
    } catch (error) {
        res.status(400).json({success: false});
    }
}
