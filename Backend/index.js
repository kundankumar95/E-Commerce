// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");

// app.use(express.json());
// app.use(cors()); //react connect at 4000 port

// //Database Connection With MongoDB
// mongoose.connect("mongodb://localhost:27017/e-commerce")

// //API Creation

// app.get("/",(req,res)=>{
//     res.send("Express App is Running")
// })

// // Image Storage Engine 
// const Storage = multer.diskStorage({
//     destination: './upload/images',
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })


// const upload = multer({Storage:Storage})

// //Creating Upload Endpoint for images

// app.use('/images',express.static('upload/images'))

// app.post("/upload",upload.single('product'),(req,res)=>{
//     res.json({
//         success:1,
//         image_url:`http://localhost:${port}/images/${req.file.filename}`
//     })
// })


// app.listen(port,(error)=>{
//     if(!error){
//         console.log("Server Running on Port " +port)
//     }
//     else{
//         console.log("Error :"+error)
//     }
// })
/*const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors()); // React connect at 4000 port

// Database Connection With MongoDB
mongoose.connect("mongodb://localhost:27017/e-commerce")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err.message);
  });

// API Creation
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

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

//Schema for creating products
const product = new mongoose.Schema("product",{
  id:{
    type: Number,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  image:{
    tpye:String,
    required:true,
  },
  category:{
    tpye:String,
    required:true,
  },
  new_price:{
    type: Number,
    required:true,
  },
  old_price:{
    type: Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  availabe:{
    type:Boolean,
    default:true,
  },

})

app.post('/addproduct',async(req,res)=>{
  const product = new Product({
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success:true,
    name:req.body.name,
  })
})

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.error("Error: " + error);
  }
});
*/
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// User Signup Endpoint
// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the user already exists
//     let user = await Users.findOne({ email });
//     if (user) {
//       return res.status(400).json({ success: false, errors: "Existing user found with the same email address." });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     user = new Users({
//       name: username,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     const data = { user: { id: user.id } };

//     // Generate JWT token
//     const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' });
//     res.json({ success: true, token });

//   } catch (error) {
//     console.error('Signup Error:', error.message);
//     res.status(500).send('Server error');
//   }
// });

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

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    console.log('Generated Salt:', salt); // Log the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed Password:', hashedPassword); // Log the hashed password

    user = new Users({
      name: username,
      email,
      password: hashedPassword,
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


// User Login Endpoint
// User Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from the database using email
    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email or Password" });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid Email or Password" });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'secret_ecom', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).send('Server error');
  }
});


app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.error("Error: " + error);
  }
});
