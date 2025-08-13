import User from "../models/user.model.js";

export const getUserData = async (req, res) =>{
    try {
        const {userId} = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        res.json({
            success: true, 
            userData:{
                fullname: user.fullname,
                isAccountVerified: user.isAccountVerified
            }
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateProfile = async (req, res)=>{
    try {
        const {profilePic} = req.body;

        const userId = req.user._id;
    } catch (error) {
        
    }
}