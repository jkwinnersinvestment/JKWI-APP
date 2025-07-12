const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
const mockUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user1', password: 'user123', role: 'customer' },
  { id: 3, username: 'john', password: 'john123', role: 'customer' },
  { id: 4, username: 'jane', password: 'jane123', role: 'customer' }
];

const mockProducts = [
  {
    id: 1,
    name: 'Premium Coffee Beans',
    price: 24.99,
    description: 'High-quality organic coffee beans from Ethiopia',
    category: 'Coffee',
    stock: 50,
    image: 'https://via.placeholder.com/300x300?text=Coffee+Beans'
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    description: 'Noise-cancelling wireless headphones with 30-hour battery',
    category: 'Electronics',
    stock: 25,
    image: 'https://via.placeholder.com/300x300?text=Headphones'
  },
  {
    id: 3,
    name: 'Organic Green Tea',
    price: 15.99,
    description: 'Premium organic green tea leaves from Japan',
    category: 'Tea',
    stock: 100,
    image: 'https://via.placeholder.com/300x300?text=Green+Tea'
  },
  {
    id: 4,
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracking with heart rate monitor',
    category: 'Electronics',
    stock: 15,
    image: 'https://via.placeholder.com/300x300?text=Fitness+Watch'
  },
  {
    id: 5,
    name: 'Artisan Chocolate Box',
    price: 35.99,
    description: 'Handcrafted premium chocolates from Belgium',
    category: 'Food',
    stock: 30,
    image: 'https://via.placeholder.com/300x300?text=Chocolate'
  }
];

const mockDashboardData = {
  orders: [
    { id: 1, date: '2024-01-15', total: 79.99, status: 'Delivered' },
    { id: 2, date: '2024-01-10', total: 24.99, status: 'Shipped' },
    { id: 3, date: '2024-01-05', total: 199.99, status: 'Processing' }
  ],
  stats: {
    totalOrders: 3,
    totalSpent: 304.97,
    memberSince: '2023-06-15'
  }
};

// Simple token storage (in production, use proper JWT)
const activeTokens = new Set();

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'JKWI Online Store API is running!' });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    products: mockProducts
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  const user = mockUsers.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }

  // Generate a simple token (in production, use proper JWT)
  const token = `token_${user.id}_${Date.now()}`;
  activeTokens.add(token);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// Dashboard endpoint (requires token)
app.get('/api/dashboard', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or missing token'
    });
  }

  res.json({
    success: true,
    data: mockDashboardData
  });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    activeTokens.delete(token);
  }

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/products - Get all products');
  console.log('  POST /api/login - Login with username/password');
  console.log('  GET  /api/dashboard - Get dashboard data (requires token)');
  console.log('  POST /api/logout - Logout (requires token)');
});