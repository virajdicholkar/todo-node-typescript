import jwt from 'jsonwebtoken';
import {UserSchema} from './user/user.model'
 
const authenticate = (req, res, next)=>{
    const token = req.headers['authorization'].split(' ')[1]
    
    jwt.verify(token, 'Top secret', (err, decoded)=>{
        if(err) return res.status(400).send('Invalid user, please login with valid credentials.');
        const user =decoded.id;
        UserSchema.findOne({_id:user},(err, user)=>{
            if(err) return res.status(500).send('We are facing a problem while processing your request please try again after some time.')
            if(!user) return res.status(404).send('No user found');
            req.body['currentUser'] =  user;
            next();
        })
    })
}

export default authenticate