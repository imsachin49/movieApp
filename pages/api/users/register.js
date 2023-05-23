import connectDB from '../../../utilis/mongo';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/users'

export default async (req, res) => {
    connectDB();
    const {method} = req;

    if(method !== 'POST'){
        return res.status(400).json({success: false});
    }

    const {username,email, password} = req.body;
    try {
        if(!email || !password || !username){
            return res.status(400).json({success: false, message: 'Please provide username,email and password'});
        }
        // if email already exists
        const isExist=await User.findOne({email});
        if(isExist){
            return res.status(400).json({success: false, message: 'Email already exists'});
        }
        // if unique then hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({success: true, token,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

