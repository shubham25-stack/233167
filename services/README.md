# Notification Service Documentation

## Overview
The notification service manages creation and retrieval of notifications for campus users (students, faculty, admin). Integrates with external evaluation service API.

## Features
- **Create Notifications**: Add new notifications with title, message, and user role
- **Retrieve All**: Get complete list of notifications
- **Retrieve by ID**: Fetch specific notification details
- **Role-Based**: Support for Admin, Student, and Faculty roles
- **Automatic Authentication**: Token management handled internally

## File Structure
```
services/
├── notificationService.js      # Core notification logic
└── README.md                    # This file

routes/
└── notificationRoutes.js        # Express route handlers
```

## API Endpoints

### 1. Create Notification
**POST** `/notifications`

**Request Body:**
```json
{
    "title": "Exam Schedule",
    "message": "Final exams start from June 1st",
    "userRole": "Student"
}
```

**Response (201 Created):**
```json
{
    "message": "Created",
    "data": {
        "id": 1,
        "title": "Exam Schedule",
        "message": "Final exams start from June 1st",
        "userRole": "Student",
        "createdAt": "2026-05-05T10:30:00Z"
    }
}
```

**Error (400 Bad Request):**
```json
{
    "error": "Title, message, and userRole required"
}
```

### 2. Get All Notifications
**GET** `/notifications`

**Response (200 OK):**
```json
{
    "data": [
        {
            "id": 1,
            "title": "Exam Schedule",
            "message": "Final exams start from June 1st",
            "userRole": "Student",
            "createdAt": "2026-05-05T10:30:00Z"
        },
        {
            "id": 2,
            "title": "Holiday Announcement",
            "message": "Campus closed on 15th May",
            "userRole": "Admin",
            "createdAt": "2026-05-04T14:20:00Z"
        }
    ]
}
```

### 3. Get Notification by ID
**GET** `/notifications/:id`

**Response (200 OK):**
```json
{
    "data": {
        "id": 1,
        "title": "Exam Schedule",
        "message": "Final exams start from June 1st",
        "userRole": "Student",
        "createdAt": "2026-05-05T10:30:00Z"
    }
}
```

**Error (404 Not Found):**
```json
{
    "error": "Not found"
}
```

## Service Functions

### createNotification(notification)
Creates a new notification in the system.

**Parameters:**
- notification (object): { title, message, userRole, createdAt }

**Returns:** 
- Created notification object or null on failure

### getAllNotifications()
Retrieves all notifications.

**Returns:** 
- Array of notification objects or empty array on failure

### getNotificationById(id)
Retrieves specific notification.

**Parameters:**
- id (string): Notification ID

**Returns:**
- Notification object or null if not found

## Authentication
- Automatic token generation using CLIENT_ID and CLIENT_SECRET
- Credentials embedded in notificationService.js
- Token refreshed on each request

## Error Handling
- Validation of required fields (title, message, userRole)
- Graceful error responses with appropriate HTTP status codes
- Console logging for debugging

## Valid User Roles
- Admin
- Student
- Faculty

## Usage in Express

```javascript
import notificationRoutes from './routes/notificationRoutes.js';

app.use('/notifications', notificationRoutes);
```

## Testing with Postman

### Create Notification
```
POST http://localhost:3000/notifications
Content-Type: application/json

{
    "title": "Test Notification",
    "message": "This is a test",
    "userRole": "Student"
}
```

### Get All Notifications
```
GET http://localhost:3000/notifications
```

### Get Specific Notification
```
GET http://localhost:3000/notifications/1
```

## External API
**Base URL:** `http://20.207.122.201/evaluation-service`

**Endpoints Used:**
- `POST /auth` - Authentication
- `POST /notifications` - Create
- `GET /notifications` - Retrieve all
- `GET /notifications/{id}` - Retrieve by ID

![alt text](<Screenshot 2026-05-05 152047.png>)  </br></br></br></br>
![alt text](<Screenshot 2026-05-05 151028.png>)</br></br></br></br>
 ![alt text](<Screenshot 2026-05-05 151050.png>)</br></br></br></br>
  ![alt text](<Screenshot 2026-05-05 151808.png>)</br></br></br></br>