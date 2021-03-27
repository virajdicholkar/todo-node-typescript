import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserSchema } from './user.model'
const router = express.Router();
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserSchema.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send('Currently not able process the request, please try again later.');
        if (!user) return res.status(404).send('No user found')

        const validUser = bcrypt.compareSync(password, user.password);
        if (!validUser) return res.status(401).send({ auth: false, token: null })

        const token = jwt.sign({ id: user._id }, 'Top secret', { expiresIn: 86400 });

        return res.status(200).send({ auth: true, token: token })
    })
})

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    UserSchema.findOne({ email }, (err, user) => {

        if (err) return res.status(500).send('Currently not able process the request, please try again later.');
        if (user) return res.status(401).send('Email adress already exist!');
        // PRocess to regoster the user
        const pass =  bcrypt.hashSync(password, 10);

        UserSchema.create({ email: email, password: pass }, (err, user) => {
            if (err) return res.status(500).send('There was probblem registering the user');
            const token = jwt.sign({ id: user._id }, 'Top secret', { expiresIn: 86400 })
            return res.status(200).send({ auth: true, token: token });
        })
    })
})

export default router;