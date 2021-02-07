const express = require('express');

const app = express();

app.get('/', (req,res) => 
res.json({ msg : "Welcome to Patidar Factory .... "}) 
);



const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));