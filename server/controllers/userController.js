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
                isAccountVerified: user.isAccountVerified,
                collegeName: user.collegeName,
                profileImage: user.fullname[0],
                title: user.title,
                followers: user.followers,
                following: user.following,
                bio: user.bio,
                email: user.email

            }
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateProfile = async (req, res)=>{
    
    try {
        const {userId} = req.body;
    
        if(!userId){
            return res.json({sucess: false, message: "Not authorized, Login again"})
        }
        const {fullname, title, collegeName, bio} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.json({success: false, message: "Not authorized, Login again"})
        }
        if(fullname){
            user.fullname=fullname;
        }
        if(title) user.title=title;
        if(collegeName) user.collegeName=collegeName;
        if(bio) user.bio=bio;

        await user.save();
        res.json({success: true, message: "Profile updated successfully"})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}