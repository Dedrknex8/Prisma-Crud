require('dotenv').config();

const express = require('express');
const developerRoutes = require('./routes/developer-routes');
const gameRoutes = require('./routes/game-routes');
const promClient = require('prom-client');
const app = express(); // create an express client
app.use(express.json());

//prometheus

const register = new promClient.Registry();
promClient.collectDefaultMetrics({register});

//calculate how many http req
const httpRequestsCounter = new promClient.Counter({
    name :'http_req_total',
    help: "Total number of httpReq",
    labelNames: ["method","route","status"],
});

//middleware to track APi req

app.use((req,res,next)=>{
    res.on('finish',()=>{
        httpRequestsCounter.inc({
            method:req.method,
            route: req.path,
            status: res.statusCode
        })
    })
    next();
})

//expose /metrics endpoint for prometheus

app.get('/metrics', async (req,res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
})
register.registerMetric(httpRequestsCounter);


app.use('/api/developer',developerRoutes);
app.use('/api/game',gameRoutes)
const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT : ${PORT}`);
    
})

