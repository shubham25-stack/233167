# 233167 - College Evaluation Service

Complete microservices implementation for college evaluation system with logging and notification services.

## Project Structure

```
/233167
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── middleware/
│   ├── logger.js           # Logging middleware
│   └── README.md           # Logger documentation
├── services/
│   ├── notificationService.js
│   └── README.md           # Notification service documentation
├── routes/
│   └── notificationRoutes.js
└── README.md              
```

## Services Overview

### 1. Logger Middleware
- Logs all application events to external API
- Supports different log levels: debug, info, warn, error, fatal
- Captures backend, frontend, and shared package events

### 2. Notification Service
- Create and manage notifications
- Support for multiple user roles (Admin, Student, Faculty)
- Retrieve all notifications or specific notification by ID

## Setup

### Prerequisites
- Node.js v22+
- npm
- axios

### Installation

```bash
npm install
```

### Environment Setup
Credentials are embedded in services (CLIENT_ID and CLIENT_SECRET).

### Running the Server

```bash
node server.js
```

Server runs on `http://localhost:3000`

## API Endpoints

### Logger
Logs are sent via middleware automatically when endpoints are accessed.

### Notifications
- `POST /notifications` - Create notification
- `GET /notifications` - Get all notifications
- `GET /notifications/:id` - Get specific notification

## Documentation

For detailed information, see:
- [Logger Middleware](./middleware/README.md)
- [Notification Service](./services/README.md)

## Testing

Use Postman to test all endpoints. See service-specific README files for examples.
![alt text](<Screenshot 2026-05-05 132648.png>)
</br>
</br>
 ![alt text](<Screenshot 2026-05-05 132458.png>)
