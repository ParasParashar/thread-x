import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    image:String,
    bio:String,
    threads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Thread',
    }],
    onboarded:{
        type:Boolean,
        default:false,
    },
    communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Community'
        }
    ],
    favorite:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread',
        }
    ],
    followRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true,
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true,
        }
    ],
    reposts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread',
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User',userSchema);
export default User;