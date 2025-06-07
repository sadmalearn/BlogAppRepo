const express = require('express');
const connectDb = require('./Config/DBconfig');
var cors = require('cors')
const bodyParser = require('body-parser');

connectDb();
const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(cors())
// app.use(express.json());
// Body-parser middleware
// app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api',require('./Routes/blogRouters'))
app.use('/api',require('./Routes/userRouter'))

app.listen(3000,()=>{
    console.log('app is listening on port no. 3000 ');
})