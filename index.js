const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/index');
const defaultRouter = require('./routes/defaultRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const port = 3000;

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});
 
app.use(bodyParser.json());

mongoose.connect(config.dbConStr)
    .then(res => console.log(`Connected to MongoDb`))
    .catch(err => console.log(err,`Failed to Connect to MongoDb`));

app.use('/',defaultRouter);
app.use('/user',userRouter);