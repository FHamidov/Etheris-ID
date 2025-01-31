# EtherID Backend

A Node.js backend application for device-based authentication and account management system.

## Features

- Device-based user registration and authentication
- JWT-based authentication with 30-day expiration
- MongoDB database integration
- Secure password hashing with bcrypt
- Optional phone number for 2FA
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
  "device_id": "unique-device-id-123",
  "full_name": "John Doe",
  "password": "SecurePass123!",
  "profile_picture": "https://example.com/photo.jpg",
  "phone_number": "+905551234567"
}
```
- **Success Response** (201 Created):
```json
{
  "message": "Registration successful",
  "status": "success",
  "token": "jwt_token_here",
  "user": {
    "device_id": "unique-device-id-123",
    "full_name": "John Doe",
    "profile_picture": "https://example.com/photo.jpg",
    "verified": false,
    "created_at": "2024-01-30T12:00:00.000Z"
  }
}
```
- **Error Response** (400 Bad Request):
```json
{
  "message": "Device ID already registered",
  "status": "error"
}
```

#### Login User
- **URL**: `/api/login`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
  "device_id": "unique-device-id-123",
  "password": "SecurePass123!"
}
```
- **Success Response** (200 OK):
```json
{
  "message": "Login successful",
  "status": "success",
  "token": "jwt_token_here",
  "user": {
    "device_id": "unique-device-id-123",
    "full_name": "John Doe",
    "profile_picture": "https://example.com/photo.jpg",
    "verified": false,
    "last_login": "2024-01-30T12:00:00.000Z"
  }
}
```
- **Error Response** (401 Unauthorized):
```json
{
  "message": "Invalid device ID or password",
  "status": "error"
}
```

## Database Schema

### User Model
```javascript
{
  device_id: {
    type: String,
    unique: true,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  password_hash: {
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
  phone_number: {
    type: String,
    unique: true,
    sparse: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: null
  }
}
```

## Security Features

- Device-based authentication
- Password hashing using bcrypt
- JWT with 30-day expiration
- Optional 2FA with phone number
- CORS protection
- Environment variables for sensitive data

## Error Handling

The API includes comprehensive error handling for:
- Invalid device ID or password
- Duplicate device registration
- Server errors
- Validation errors

## Testing

Run the tests using:
```bash
npm test
```

Test cases include:
- Registration validation
- Login authentication
- Device ID uniqueness
- Password hashing
- JWT token generation
- Error handling

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