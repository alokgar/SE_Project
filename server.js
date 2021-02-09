const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 

const app = express();

//connect Database
connectDB();

//Init Middleware
app.use(express.json({extended:false}));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));



const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));