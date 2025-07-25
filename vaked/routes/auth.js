const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../schema/userSchema");
const zod = require("zod");
const isValidYouTubeChannel = require("../utils/youtubeapi");


// Zod validation schema
const signupBody = zod.object({
  username: zod.string().min(5).max(30),
  email: zod.string().email(),
  password: zod.string().min(6),
  youtube: zod.string().url().refine(val => val.includes("/channel/UC"), {
    message: "Must be a full YouTube channel URL with /channel/UCxxxxx format",
  }),
});

router.post("/signup", async (req, res) => {
  try {
    console.log("Signup input:", req.body);

    const { username, email, password, youtube } = signupBody.parse(req.body);

    // ✅ Check if YouTube channel is valid
    const validChannel = await isValidYouTubeChannel(youtube, process.env.Youtube_api);
    if (!validChannel) {
      return res.status(400).json({ message: "Invalid or non-existent YouTube channel URL" });
    }

    // ✅ Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // ✅ Check for existing YouTube channel
    const existingChannel = await User.findOne({ youtube });
    if (existingChannel) {
      return res.status(409).json({ message: "This YouTube channel is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      youtube,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username,
        email,
        youtube,
      },
    });

  } catch (err) {
    if (err instanceof zod.ZodError) {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

router.post('/signin', async (req, res) => {
  try {
    console.log("requested sigim")
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
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5. Send response
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        payment:user.payment,
        youtube:user.youtube

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
