const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const path=require('path');
const dotenv = require('dotenv');
dotenv.config();

// const __dirname=path.resolve();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist'))); //this will serve static files
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

//htm to spa routes

if(process.env.NODE_ENV==='production'){
  app.get(/(.*)/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));