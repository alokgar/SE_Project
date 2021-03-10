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
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/products', require('./routes/api/product'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/supplier', require('./routes/api/supplier'));
app.use('/api/raw_material', require('./routes/api/raw_material'));
app.use('/api/size', require('./routes/api/size'));
app.use('/api/stock', require('./routes/api/stock'));





const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));