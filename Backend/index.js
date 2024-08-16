
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Failed to connect to MongoDB", err.message));

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Express App is Running Now");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Image Upload Endpoint
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);

// Add Product Endpoint
app.post('/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, product });

  } catch (err) {
    console.error('Add Product Error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Remove Product Endpoint
app.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error('Remove Product Error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get All Products Endpoint
app.get('/allproducts', async (req, res) => {
  try {
    let products = await Product.find({});
    res.send(products);
  } catch (err) {
    console.error('Get All Products Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cartData: {
    type: Object,
    default: () => {
      const cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
      return cart;
    },
  },
  date: { type: Date, default: Date.now },
});

const Users = mongoose.model('Users', userSchema);

// Creating endpoint for registering the user
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('Request Body:', req.body); // Log the request body

    if (!username || !email || !password) {
      console.log('Missing fields:', { username, email, password });
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    let user = await Users.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new Users({
      name: username,
      email,
      password
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'secret_ecom', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Signup Error:', error.message); // Log the error message
    res.status(500).send('Server error');
  }
});

//creating endpoint for user login
app.post('/login',async (req,res)=>{
  let user = await Users.findOne({email:req.body.email});
  if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare){
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token});
    }
    else{
      res.json({success:false,error:"Wrong Password"});
    }
  }
  else{
    res.json({success:false,errors:"Wrong Email Id"});
  }
})

//creating endpoint for newcollections data
app.get('/newcollection',async (req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
})

// creating endpoint for popular in woment section
app.get('/popularinwomen',async(req,res)=>{
  let products = await Product.find({category:"women"})
  let popular_in_women = products.slice(0,4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


app.post('/addtocart', fetchUser, async (req, res) => {
  try {
    console.log("Added", req.body.itemId);

    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await Users.findByIdAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.json({ message: "Added" });
  } catch (error) {
    console.error('Add to Cart Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// creating endpoint to remove from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
  try {
    console.log("removed", req.body.itemId);

    let userData = await Users.findOne({ _id: req.user.id });
    
    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
    }
    
    await Users.findByIdAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    
    res.json({ message: "Removed" }); // Send a JSON response
  } catch (error) {
    console.error('Remove from Cart Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//creating end point to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
})


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.error("Error: " + error);
  }
});
