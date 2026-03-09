const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const mainRoute = require('./routes/main.route');
const rateLimiter = require('./config/rateLimit');

const app = express();

const PORT = process.env.PORT || 5555;

db() 

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5555'];

const corsOptions = {
    origin: function(origin, callback){
        if(!origin)return callback(null, true);
        if(allowedOrigins.indexOf(origin) !== -1){
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(rateLimiter);
app.use(cors(corsOptions));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/api', mainRoute);
app.use('/api/dashboard', require('./routes/dashboard.route'));

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
