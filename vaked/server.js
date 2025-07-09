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
const userrouter=require('./routes/Userprofile')
const challengeroute=require('./routes/challemge')




const app = express();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("✅ Server is alive");
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional, for form inputs

app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/process', analyzeRoute);
app.use('/api/payment',razorRoute)
app.use('/api/user',videorouter)
app.use('/api',paymentRouter)
app.use('/api',userrouter)
app.use('/api/challenge', challengeroute);
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