import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        status:{
            type:String,
            default:'NEW'
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
    },{timestamps:true}
)

export const TodoSchema = mongoose.model<any>('Task', todoSchema);
