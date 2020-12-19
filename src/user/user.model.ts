import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },{timestamps:true}
)

export const UserSchema = mongoose.model<any>('User', userSchema);
