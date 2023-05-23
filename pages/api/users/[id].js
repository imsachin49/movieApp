import connectDB from '../../../utilis/mongo';
import User from '../../../models/users'

export default async function handler(req, res) {
    connectDB();
    const {
        query: { id },
        method,
    } = req;

    const {movieId} = req.body;

    console.log(id,method,movieId)

    if(req.method!=="PATCH") 
        return res.status(400).json({success:false})
    
    // Find user by id and update
    try{
        const user=await User.findById(id);
        // console.log(user)
        if(!user) return res.status(400).json({success:false})
        // now add movie id to user's favorite list if its not already there if its there then remove it
        if(user.favorites.includes(req.body.movieId)){
            user.favorites=user.favorites.filter(movieId=>movieId!==req.body.movieId)
        }else{
            user.favorites.push(req.body.movieId)
        }
        await user.save()
        console.log(user)
        res.status(200).json({success:true,user})
    }catch(err){
        console.log(err)
        return res.status(400).json({success:false})
    }
}
