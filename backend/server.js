require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//middleware
app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
});


//routes
app.use('/api/notes', noteRoutes);

//deployment

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build','index.html'));
    });
}



//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{                 
    app.listen(process.env.PORT,  () => {                                 
        console.log("Connected to DB and server started on port ", process.env.PORT);
    });
    }) 
    .catch(function (err) { 
        console.log(err);
    })
