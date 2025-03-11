require('dotenv').config();

const express = require('express');
const developerRoutes = require('./routes/developer-routes');
const gameRoutes = require('./routes/game-routes');
const app = express(); // create an express client

app.use(express.json());
app.use('/api/developer',developerRoutes);
app.use('/api/game',gameRoutes)
const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT : ${PORT}`);
    
})

