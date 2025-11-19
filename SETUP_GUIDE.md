# Setup Guide - Tour Project Backend

## Quick Start

### 1. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` folder with the following content:

```
MONGODB_URI=mongodb://localhost:27017/tour_project
PORT=3000
```

**Important:** 
- For local development, use: `mongodb://localhost:27017/tour_project`
- For production deployment, replace with your production MongoDB connection string
- The `.env` file is already in `.gitignore` so it won't be committed to version control

### 3. Start MongoDB

Make sure MongoDB is running on your local machine:
- Default connection: `mongodb://localhost:27017`
- If using MongoDB Compass, ensure the service is running

### 4. Start the Backend Server

```bash
# From the backend folder
npm start

# Or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:3000`

### 5. Update Frontend API URL (if needed)

If your backend is running on a different port or URL, update the `API_BASE_URL` in:
- `project/sign/script.js` (line 2)

Change from:
```javascript
const API_BASE_URL = 'http://localhost:3000/api/auth';
```

To your production URL:
```javascript
const API_BASE_URL = 'https://your-production-url.com/api/auth';
```

## Testing the API

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
    "username": "testuser",
    "password": "password123"
  }'
```

## Database Structure

The application creates a MongoDB database called `tour_project` with a `users` collection. Each user document contains:

- `username` (unique)
- `password` (hashed with bcrypt)
- `email` (unique)
- `phone`
- `createdAt` (timestamp)

## Production Deployment

When deploying to production:

1. Update the `.env` file with your production MongoDB connection string
2. Update the `API_BASE_URL` in the frontend JavaScript files
3. Ensure MongoDB is accessible from your production server
4. Set environment variables on your hosting platform (Heroku, Vercel, AWS, etc.)

Example production `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tour_project?retryWrites=true&w=majority
PORT=3000
```




