# Backend Integration Guide - Tour Project

## Overview
All user data (signup, login, booking, and payment) is now stored in MongoDB Compass using environment variables for easy deployment.

## Features Implemented

### 1. Combined Login/Signup Page
- **Location**: `project/sign/login.html`
- **Behavior**: 
  - Shows **Sign Up form first** (default)
  - Users can switch to Login form
  - Login uses **email and password** (not username)
  - After successful signup, automatically switches to login form

### 2. Data Storage in MongoDB
All user data is stored in the `tour_project` database, `users` collection:

#### User Registration Data:
- Username (unique)
- Email (unique)
- Password (hashed with bcrypt)
- Phone number

#### Booking Details:
- Full Name
- Aadhaar Number
- Total People
- Package Selection
- Booking Date

#### Payment Details:
- Billing Address (Name, Email, City, State, Pin Code)
- Card Details (Name, Last 4 digits, Expiry, CVV masked)

## API Endpoints

### Base URL
```
http://localhost:3000/api/auth
```

### 1. Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "password": "password123",
    "email": "john@example.com",
    "phone": "1234567890"
  }
  ```

### 2. Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### 3. Save Booking Details
- **POST** `/api/auth/booking`
- **Body:**
  ```json
  {
    "userId": "user_id_from_login",
    "fullName": "John Doe",
    "aadhaarNo": "123456789012",
    "totalPeople": 2,
    "package": "5days/6000"
  }
  ```

### 4. Save Payment Details
- **POST** `/api/auth/payment`
- **Body:**
  ```json
  {
    "userId": "user_id_from_login",
    "billingName": "John Doe",
    "billingEmail": "john@example.com",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "pinCode": "641001",
    "cardName": "John Doe",
    "cardNumber": "1234567890123456",
    "expMonth": "12",
    "expYear": "2025",
    "cvv": "123"
  }
  ```

## User Flow

1. **Sign Up** → User creates account at `project/sign/login.html`
2. **Login** → User logs in with email and password
3. **Booking** → User fills booking form at `project/login/index.html`
   - Requires login password verification
   - Saves booking details to MongoDB
4. **Payment** → User fills payment form at `project/EMAIL/index.html`
   - Saves payment details to MongoDB
5. **Confirmation** → Redirects to `project/EMAIL/confirmation.html`

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Environment Variables
Create `.env` file in `backend` folder:
```
MONGODB_URI=mongodb://localhost:27017/tour_project
PORT=3000
```

### 3. Start MongoDB
Ensure MongoDB is running on `localhost:27017`

### 4. Start Backend Server
```bash
cd backend
npm start
```

### 5. View Data in MongoDB Compass
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- Database: `tour_project`
- Collection: `users`

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **Card Security**: Only last 4 digits of card number stored
3. **CVV Protection**: CVV is masked (stored as '***')
4. **User Authentication**: Booking and payment require valid login

## Production Deployment

When deploying to production:

1. Update `.env` file with production MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tour_project
   PORT=3000
   ```

2. Update `API_BASE_URL` in frontend files:
   - `project/sign/script.js` (line 2)
   - `project/login/index.html` (in script section)
   - `project/EMAIL/index.html` (in script section)

   Change from:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api/auth';
   ```
   
   To your production URL:
   ```javascript
   const API_BASE_URL = 'https://your-production-url.com/api/auth';
   ```

## File Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   └── User.js               # User model with booking & payment
├── routes/
│   └── authRoutes.js         # All API endpoints
├── server.js                 # Express server
├── package.json
└── .env                      # Environment variables

project/
├── sign/
│   ├── login.html            # Combined signup/login page
│   └── script.js             # Frontend API calls
├── login/
│   └── index.html            # Booking form
└── EMAIL/
    ├── index.html            # Payment form
    └── confirmation.html     # Confirmation page
```

## Testing

### Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com",
    "phone": "1234567890"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

1. **"Network error"**: Ensure backend server is running on port 3000
2. **"User not found"**: Make sure user is logged in (check localStorage)
3. **MongoDB connection error**: Verify MongoDB is running and connection string is correct
4. **CORS errors**: Backend has CORS enabled, but check if frontend URL matches




