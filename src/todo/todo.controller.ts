import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {TodoSchema} from './todo.model'
const router = express.Router();
router.get('/todo/list', (req, res)=>{
    const {currentUser} = req.body;
        TodoSchema.find({user: currentUser._id},(err, todo)=>{
            if(err) return res.status(500).send('Currently not able process the request, please try again later.');
            if(!todo) return res.status(404).send('No task found')
            return res.status(200).send(todo)
        })
})
router.get('/:id', (req, res)=>{
    const {id} = req.params;
         TodoSchema.findOne({_id:id},(err, task)=>{
             if(err) return res.status(500).send('Currently not able process the request, please try again later.');
             if(!task) return res.status(404).send('No task found.')
             return res.status(200).send(task)
         })
})
router.put('/:id', (req, res)=>{
    console.log('===>',req.params)
    const {id} = req.params;
    console.log('this is the id',id)
    // return res.status(200)   
         TodoSchema.findByIdAndUpdate(id,{$set:{status:req.body.status}},{},(err, task)=>{
             if(err) return res.status(500).send('Currently not able process the request, please try again later.');
             if(!task) return res.status(404).send('No task found.')
             return res.status(200).send(task)
         })
})
router.delete('/:id', (req, res)=>{
    console.log('===>',req.params)
    const {id} = req.params;
         TodoSchema.findByIdAndRemove(id,{},(err, task)=>{
             if(err) return res.status(500).send('Currently not able process the request, please try again later.');
             if(!task) return res.status(404).send('No task found.')
             return res.status(200).send(task)
         })
})
router.post('/',  (req, res)=>{
    const {name, description, status, currentUser} = req.body;
    const user = currentUser._id
         TodoSchema.findOne({name}, (err, todo)=>{
             
             if(err) return res.status(500).send('Currently not able process the request, please try again later.');
             if(todo) return res.status(422).send('Todo task already exist!');
         
              TodoSchema.create({name, description, status,user}, (err, todo)=>{
             if(err) return res.status(500).send('There was probblem creating task.');
             return res.status(200).send({ todo});
         })
     })

})

export default router;