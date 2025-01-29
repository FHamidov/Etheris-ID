# EtherID Backend

A Node.js backend application for user authentication and account management system.

## Features

- User registration and authentication
- JWT-based authentication
- MongoDB database integration
- Secure password hashing
- Phone number and email validation
- RESTful API endpoints

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- dotenv for environment variables
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/etherid-backend.git
cd etherid-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3003
MONGODB_URI=mongodb://localhost:27017/etheris
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

### Authentication Endpoints

#### Register User
- **URL**: `/api/register`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "phone": "+994501234567",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}
```
- **Success Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone": "+994501234567"
  }
}
```
- **Error Response** (400 Bad Request):
```json
{
  "message": "User with this email or phone already exists"
}
```

#### Login User
- **URL**: `/api/login`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
- **Success Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone": "+994501234567"
  }
}
```
- **Error Response** (401 Unauthorized):
```json
{
  "message": "Invalid email or password"
}
```

## Database Schema

### User Model
```javascript
{
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  },
  created_at: Date,
  updated_at: Date
}
```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS protection
- Environment variables for sensitive data

## Error Handling

The API includes comprehensive error handling for:
- Invalid credentials
- Duplicate email/phone registration
- Server errors
- Validation errors

## Testing

You can find example test cases in the `test-examples.md` file. These include:
- Registration test cases
- Login test cases
- Error case examples
- Sample test user data

## Development

To start the development server with hot reload:
```bash
npm run dev
```

## Production

For production deployment:
1. Update environment variables
2. Set secure JWT secret
3. Configure proper MongoDB connection
4. Run with process manager (e.g., PM2):
```bash
npm install -g pm2
pm2 start index.js
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 