import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {TodoSchema} from './todo.model'
const router = express.Router();
router.get('/todo/list', (req, res)=>{
    const token = req.headers['authorization'].split(' ')[1]
     jwt.verify(token, 'Top secret', (err, decoded)=>{
        if(err) return res.status(400).send('Invalid user, please login with valid credentials.');
        const userId =decoded.id; 
        TodoSchema.find({user: userId},(err, todo)=>{
            if(err) return res.status(500).send('Currently not able process the request, please try again later.');
            if(!todo) return res.status(404).send('No task found')
            return res.status(200).send(todo)
        })
    });
})
router.get('/:id', (req, res)=>{
    const {id} = req.query;
    const token = req.headers['authorization'].split(' ')[1]
     jwt.verify(token, 'Top secret', (err, decoded)=>{
        if(err) return res.status(400).send('Please login with valid credentials.');
         TodoSchema.findOne({_id:id},(err, task)=>{
             if(err) return res.status(500).send('Currently not able process the request, please try again later.');
             if(!task) return res.status(404).send('No task found.')
             return res.status(200).send(task)
         })

     })
})


router.post('/',  (req, res)=>{
    const {name, description, status} = req.body;
    const token = req.headers['authorization'].split(' ')[1]
     jwt.verify(token, 'Top secret', (err, decoded)=>{
        if(err) return res.status(400).send('Please login with valid credentials.');
        const user =decoded.id; 
         TodoSchema.findOne({name}, (err, todo)=>{
             
             if(err) return res.status(500).send('Currently not able process the request, please try again later.');
             if(todo) return res.status(401).send('Todo task already exist!');
         
              TodoSchema.create({name, description, status,user}, (err, todo)=>{
             if(err) return res.status(500).send('There was probblem creating task.');
             return res.status(200).send({ todo});
         })
     })

     })
})

export default router;