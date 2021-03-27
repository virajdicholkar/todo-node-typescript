import express from 'express';
import  mongoose from  'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import unsecuredRoutes from './unsecuredRoutes';
import cors from 'cors';
import auth from './authenticate'
import config from './config';
const app = express();
const mongoURI = config.mongoDbUrl;

app.use('/', (req, res, next)=>{
    console.log('Welcome to the todo application.');
    next();
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOpts = {
    origin: '*',
    
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept'
    ]
};


app.use(cors(corsOpts));
app.use('/auth', unsecuredRoutes);
 app.use('/api',auth, routes);
// Database connection
mongoose.connect(mongoURI, {
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>{
    console.log('Connected with the database successfully');
})
.catch((error)=>{
    console.log(error.message);
})
const port = config.port;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
});