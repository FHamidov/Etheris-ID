# API Test Examples.

## Register Endpoint Test

### Register Request
```bash
curl -X POST http://localhost:3003/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+994501234567",
    "password": "Test12345!",
    "full_name": "Test User"
  }'
```

### Expected Success Response
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65bf12345678901234567890",
    "email": "test@example.com",
    "full_name": "Test User",
    "phone": "+994501234567"
  }
}
```

### Register with Existing Email (Error Case)
```bash
curl -X POST http://localhost:3003/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+994507654321",
    "password": "Test12345!",
    "full_name": "Another User"
  }'
```

### Expected Error Response
```json
{
  "message": "User with this email or phone already exists"
}
```

## Login Endpoint Test

### Login Request
```bash
curl -X POST http://localhost:3003/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test12345!"
  }'
```

### Expected Success Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65bf12345678901234567890",
    "email": "test@example.com",
    "full_name": "Test User",
    "phone": "+994501234567"
  }
}
```

### Login with Wrong Password (Error Case)
```bash
curl -X POST http://localhost:3003/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "WrongPassword123!"
  }'
```

### Expected Error Response
```json
{
  "message": "Invalid email or password"
}
```

## Test Data Examples

Here are some test user examples you can use:

### Test User 1
```json
{
  "email": "john.doe@example.com",
  "phone": "+994501234567",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}
```

### Test User 2
```json
{
  "email": "jane.smith@example.com",
  "phone": "+994507654321",
  "password": "StrongPass456!",
  "full_name": "Jane Smith"
}
```

### Test User 3
```json
{
  "email": "alex.brown@example.com",
  "phone": "+994509876543",
  "password": "Pass2024!",
  "full_name": "Alex Brown"
}
```

### Test User 4
```json
{
  "email": "sarah.wilson@example.com",
  "phone": "+994503456789",
  "password": "Wilson123!",
  "full_name": "Sarah Wilson"
}
``` 