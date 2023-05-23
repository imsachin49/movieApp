// import connectDB from '../../../utilis/mongo';
// import User from '../../../models/users'
import connectDB from "@/utilis/mongo";
import User from "@/models/users";

// get the list of movies from the user's favorites
export default async function handler(req, res){
    connectDB();
    const {
        query: { id },
        method,
    }=req;
    console.log(id)
    if(method !== 'GET'){
        return res.status(400).json({success: false});
    }
    try {
        const user=await User.findById(id);

        const favorites=user.favorites;
        // using promise All to fetch all the movies from the favorites list
        const movies=await Promise.all(favorites.map(async (movieId)=>{
            const movie=await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=db75be3f6da59e6c54d0b9f568d19d16`);
            const data=await movie.json();
            return data;
        }))
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({success: false});
    }
}

 
