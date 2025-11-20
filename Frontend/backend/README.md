# Tour Project Backend

Backend server for Tour Project with MongoDB integration for user authentication.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   - Create a `.env` file in the `backend` folder
   - Add the following variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/tour_project
     PORT=3000
     ```
   - For production, update `MONGODB_URI` with your production MongoDB connection string

3. **Start MongoDB**
   - Make sure MongoDB is running on your local machine
   - Default connection: `mongodb://localhost:27017`

4. **Run the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Register User
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

### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```

### Health Check
- **GET** `/api/health`

## Database

The application uses MongoDB to store user information:
- **Database:** `tour_project`
- **Collection:** `users`

User data stored:
- Username (unique)
- Password (hashed with bcrypt)
- Email (unique)
- Phone number
- Created date

## Environment Variables

For production deployment, update the `.env` file with your production MongoDB connection string:
```
MONGODB_URI=mongodb://your-production-connection-string
PORT=3000
```






