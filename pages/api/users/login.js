import connectDB from '../../../utilis/mongo';
import User from '../../../models/users'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    connectDB();
    console.log("hel")
    const {method} = req;
    
    if(method !== 'POST'){
        return res.status(400).json({success: false});
    }

    const {email, password} = req.body;
    console.log(req.body)
    try {
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Please provide email and password'});
        }
        const user= await User.findOne({email}).select('+password');
        console.log(user)
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid Credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: 'Invalid Credentials'});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({success: true, token,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

