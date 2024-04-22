const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(
  "mongodb+srv://knitex202:Phantomx202@scheminganimations.0h3saky.mongodb.net/scheming-animations"
);

//API Creation

app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating  Upload Endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});



// Schema for creating Promotion Codes

const Promotion = mongoose.model("Promotion",{
  id:{
    type: Number,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  code:{
    type: String,
    required: true,
  },
  discount:{
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  available:{
    type: Boolean,
    default: true,
  }
})


// Creating API  for creating new Products

app.post("/addpromotion", async (req, res) => {
  try {
    // Check if a promotion with the same name already exists
    const existingName = await Promotion.findOne({ name: req.body.name });
    if (existingName) {
      return res.status(400).json({ error: "Promotion with this name already exists." });
    }

    // Check if a promotion with the same code already exists
    const existingCode = await Promotion.findOne({ code: req.body.code });
    if (existingCode) {
      return res.status(400).json({ error: "Promotion with this code already exists." });
    }

    let promotions = await Promotion.find({});
    let id;

    if (promotions.length > 0) {
      let last_promotion_array = promotions.slice(-1)
      let last_promotion = last_promotion_array[0]
      id = last_promotion.id + 1;
    } else {
      id = 1;
    }

    const promotion = new Promotion({
      id: id,
      name: req.body.name,
      code: req.body.code,
      discount: req.body.discount,
    });

    await promotion.save();
    res.json({
      success: 1,
      name: promotion.name,
      code: promotion.code,
      discount: promotion.discount,
    });
  } catch (error) {
    console.error("Error adding promotion:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//Creating API for deleting Promotions
app.post('/removepromo', async (req, res) => {
  await Promotion.findOneAndDelete({id : req.body.id});
  console.log("Removed");
  res.json({
    success: true,
    name:req.body.name
  })
})

//Creating API for getting all products
app.get('/allpromos', async (req, res) => {
  let promos = await Promotion.find({});
  console.log("All Products Fetched");
  res.send(promos);
})

//Creating API for getting Promotion code
app.get('/promocode', async (req, res) => {
  let promos = await Promotion.find({});
  console.log("All Products Fetched");
  res.send(promos);
})

//Schema for Creating Products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },

    rating:{
        type: Number,
        required: true,
    },

    new_price:{
        type: Number,
        required: true,
    },

    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }
});


// Creating API  for creating new Products
app.post("/addproduct", async (req,res)=> {
  let products = await Product.find({});
  let id;
  if(products.length > 0){
    let last_product_array = products.slice(-1)
    let last_product = last_product_array[0]
    id = last_product.id + 1;
  } else {
    id = 1;
  }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        available: req.body.available,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.send({
        success: 1,
        name: req.body.name,
    });
})

//Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({id : req.body.id});
  console.log("Removed");
  res.json({
    success: true,
    name:req.body.name
  })
})

//Creating API for getting all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
})

//Creating API for user model

const Users = mongoose.model('Users', {
  firstname:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    unique:true,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  cartData:{
    type: Object,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  }
})

//Creating Endpoint for registering new users

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({email:req.body.username})
  if(check) {
    return res.status(400).json({success:false, errors:"User already registered"});
  }
  let cart = {};
  for(let i = 0; i < 300; i++) {
    cart[i]= 0;
}
  const user = new Users({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })

  await user.save();
  
  const data = {
    user:{
      id: user.id
    }
  }

  const token = jwt.sign(data,"secret_ecom");
  res.json({success:true,token})

})

// Creating Endpoint for User Login
app.post("/login",async (req,res)=>{
  let user = await Users.findOne({username:req.body.username});
  if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare){
      const data = {
        user:{
          id: user.id
        }
      }
      const token = jwt.sign(data,"secret_ecom");
      res.json({success:true,token})
    }
    else{
      res.json({success:false,errors:"Invalid Password"})
    }
  }
  else{
    res.json({success:false,errors:"Invalid User Name"})
  }
})

// Creating Endpoint for New Collection Data
app.get("/newcollections",async (req, res)=> {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8)
  console.log("new collection fetched")
  res.send(newcollection);
})

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port: " + port);
  } else {
    console.log("Error : " + error);
  }
});
