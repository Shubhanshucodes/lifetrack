const express = require ("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../schema/userSchema"); 
const zod= require('zod');



const signupvody= zod.object({
  username:zod.string().min(5).max(30),
   email: zod.string().email(),
  password: zod.string().min(6),

})

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = signupvody.parse(req.body)
    const existinguser= await User.findOne({email})
    if(existinguser){
      return res.status(409).send("user already exixts")
    }
    const hashedpassword= await bcrypt.hash(password,10)
    const user= new User({username,email,password:hashedpassword})
    await user.save();
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:'7d'
    })
    res.cookie('token',token,{
      httpOnly:true,// vrowser cannot access
      secure:process.env.NODE_ENV=== "production",//https requests only in production.
      sameSite: 'strict',// safe from different site attacks
      maxAge: 7*24*60*60*1000// lifetime
      
    })
    res.status(201).json({
      message:'User registered successfully',
      user:{id:user._id,username,email}
    })

  }

  catch(err){
    if(err instanceof zod.ZodError){
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' });


  }
 
});




const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = signinSchema.parse(req.body);

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. Send cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5. Send response
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    if (err instanceof zod.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
