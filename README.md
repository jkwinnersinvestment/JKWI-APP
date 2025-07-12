# JKWI-APP
PUBLIC ONLINE STORE

## Overview
JKWI-APP is a full-stack online store application with a React frontend and Node.js/Express backend. The application features product listings, user authentication, and a customer dashboard with order management.

## 🏗️ Project Structure
```
JKWI-APP/
├── backend/          # Node.js + Express API server
│   ├── server.js     # Main server file with routes and mock data
│   ├── package.json  # Backend dependencies
│   └── .gitignore    # Backend-specific gitignore
├── frontend/         # React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Main application pages
│   │   ├── contexts/      # React context providers
│   │   ├── services/      # API service functions
│   │   └── App.js         # Main application component
│   ├── package.json       # Frontend dependencies
│   └── public/            # Static assets
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/jkwinnersinvestment/JKWI-APP.git
cd JKWI-APP
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Start the Application

**Terminal 1 - Start Backend (Port 5000):**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend (Port 3000):**
```bash
cd frontend
npm start
```

### 4. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔐 Demo Login Credentials

The application uses mock authentication. You can log in with any of these test accounts:

| Username | Password | Role     |
|----------|----------|----------|
| admin    | admin123 | admin    |
| user1    | user123  | customer |
| john     | john123  | customer |
| jane     | jane123  | customer |

## 📱 Features

### Frontend (React)
- **Home Page:** Product catalog with mock products
- **Login Page:** Authentication with demo credentials
- **Dashboard:** User-specific dashboard with:
  - Account overview with stats
  - Recent orders table
  - Quick action buttons
- **Protected Routes:** Dashboard requires authentication
- **Responsive Design:** Works on desktop and mobile

### Backend (Node.js + Express)
- **RESTful API** with the following endpoints:
  - `GET /api/products` - Fetch all products
  - `POST /api/login` - User authentication
  - `GET /api/dashboard` - Dashboard data (requires auth token)
  - `POST /api/logout` - User logout
- **Mock Data:** In-memory storage for products and users
- **CORS Enabled:** For frontend-backend communication
- **Simple Token Auth:** Basic authentication system

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm start
```

### Build for Production
```bash
cd frontend
npm run build
```

## 📊 Mock Data

### Products
The application includes 5 mock products:
- Premium Coffee Beans ($24.99)
- Wireless Bluetooth Headphones ($79.99)
- Organic Green Tea ($15.99)
- Smart Fitness Watch ($199.99)
- Artisan Chocolate Box ($35.99)

### Users
4 test users with different roles and order histories.

## 🔄 API Endpoints

### GET /api/products
Returns all available products with details including name, price, description, category, stock, and image.

### POST /api/login
```json
{
  "username": "admin",
  "password": "admin123"
}
```
Returns authentication token and user information.

### GET /api/dashboard
Requires Authorization header with Bearer token. Returns user-specific dashboard data including orders and statistics.

## 🎨 Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios (HTTP client)
- CSS3 (Custom styling)

**Backend:**
- Node.js
- Express.js
- CORS middleware
- In-memory data storage

## 📝 License
This project is licensed under the ISC License.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support
For support or questions, please open an issue in the GitHub repository.
