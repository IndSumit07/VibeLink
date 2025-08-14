import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname : {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email:{
            type: String,
            requird: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        bio:{
            type: String,
            default: "Not set"
        },
        title: {
            type: String,
            default: "Not set"
        },
        collegeName:{
            type: String,
            default: "Not set"
        },
        followers:{
            type: Number,
            default: 0
        },
        following:{
            type:Number,
            default: 0
        },
        verifyOtp: {
            type: String,
            default: ""
        },
        verifyOtpExpireAt: {
            type: Number,
            default: 0
        },
        isAccountVerified:{
            type: Boolean,
            default: false
        },
        resetOtp: {
            type: String,
            default: ""
        },
        resetOtpExpireAt:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;