const express = require('express')
const mongoose = require('mongoose')
const cookiParser = require('cookie-parser')
const cors = require('cors')


const authRouter = require('./routes/auth/auth-routes')

// DB connection
mongoose.connect("mongodb+srv://vickykumar898980:21511786%40vks@ecomm.bywfr.mongodb.net/")
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error:', err));

const app = express()
const PORT = process.env.PORT || 5000;  // if port is there else take 5000

app.use(
    cors({
        origin : 'http://localhost:5173',  
        methods : ['GET', 'POST', 'DELETE', 'PUT'], // methods use
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookiParser());
app.use(express.json());

app.use("/api/auth", authRouter);

// after server running
app.listen(PORT, ()=> console.log(`Server is runnning on Port : ${PORT}`));