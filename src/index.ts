import express from 'express';
import  mongoose from  'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
const app = express();
const mongoURI = 'mongodb://localhost:27017/todo-app';

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
    ],
  
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept'
    ]
  };

  
  app.use(cors(corsOpts));
 app.use('/api', routes);
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
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
});