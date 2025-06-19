require("dotenv").config(); // must be first line
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose=require('mongoose')
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/upload');
const analyzeRoute= require('./routes/alaysis');
const razorRoute= require('./routes/razorgateway')
const videorouter=require('./routes/videos')
const paymentRouter=require('./routes/verifypaymet')





const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/process', analyzeRoute);
app.use('/api/payment',razorRoute)
app.use('/api/user',videorouter)
app.use('/api',paymentRouter)

// DB + Server
mongoose.connect("mongodb+srv://lifetrack:Lifetrack123@cluster0.ad1ub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
     useNewUrlParser: true,
     useUnifiedTopology: true
  }
)
.then(()=>{
  console.log("connected to mongo")
  app.listen(PORT,()=>{
    console.log("app running on port", PORT)
  })
})