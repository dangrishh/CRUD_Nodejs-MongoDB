const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel.js')
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes

app.get('/', (req, res) => {
  res.send('Hello Dear, My Name is Daniel De Torres')
})

app.get('/about', (req, res) => {
  res.send('This is about page, My Name is Daniel De Torres')
})

// CREATE & SAVE PRODUCTS
app.post('/products', async(req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
});


// FETCH & READ ALL PRODUCTS
app.get('/products', async(req, res) => {
  try {
    const products = await Product.find(req.body)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// ID Fetch & Read  Products
app.get('/products/:id', async(req, res) => {
  try {
    // to Get ID
    const {id} = req.params;

    const products = await Product.findById(id);
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// Update the Products
app.put('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we can't find any product in database
  if(!product){
    return res.status(404).json({message: `Cannot find any product with ID ${id}`})
  }
  const updatedProduct = await Product.findById(id);
  res.status(200).json(updatedProduct)

  } catch (error) {
    res.status(500).json({message: error.message})
  } 
})

// Delete a product

app.delete('/products/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id, req.body);
    // we can't find any product in database
    if(!product){
      return res.status(404).json({message: `Cannot find any product with ID ${id}`})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.connect('mongodb+srv://admin:admin@crudnodejs.ydtzqky.mongodb.net/NODE-MONGO?retryWrites=true&w=majority')
.then(() => {
  console.log('MongoDB is Already Connected')
  app.listen(3000, () => {
    console.log(`Node API app is running on port`);
  });
}).catch((error) => {
  console.log(error)
});