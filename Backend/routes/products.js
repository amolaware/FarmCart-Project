const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get products' });
  }
});

// ✅ Farmer: Get only own products
router.get('/my-products', auth, async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user.id });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Farmer: Add product (with image upload)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, countInStock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
      name,
      price,
      description,
      category,
      countInStock,
      imageUrl,
      farmer: req.user.id
    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error adding product' });
  }
});

// ✅ Get single product by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Farmer: Update own product (optional new image)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.farmer.toString() !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    const { name, price, description, category, countInStock } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock;

    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Update failed' });
  }
});

// ✅ Farmer: Delete own product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.farmer.toString() !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
