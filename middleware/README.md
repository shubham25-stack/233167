# Logger Middleware Documentation

## Overview
The logger middleware captures application events and sends them to the evaluation service API for tracking and monitoring.

## Features
- **Event Logging**: Capture backend, frontend, and shared component events
- **Log Levels**: debug, info, warn, error, fatal
- **Automatic Token Management**: Refreshes auth tokens automatically
- **Error Handling**: Graceful error handling and logging

## File Structure
```
middleware/
└── logger.js          # Main logger implementation
```

## Function: `log(stack, level, pkg, message)`

### Parameters
- **stack** (string): "backend" or "frontend"
- **level** (string): "debug", "info", "warn", "error", "fatal"
- **pkg** (string): Package/component name
- **message** (string): Log message

### Valid Package Names

**Backend Packages:**
- cache, controller, cron_job, db, domain, handler, repository, route, service

**Frontend Packages:**
- api, component, hook, page, state, style

**Shared Packages:**
- auth, config, middleware, utils

## Usage Example

```javascript
import { log } from './middleware/logger.js';

// Log successful operation
await log('backend', 'info', 'controller', 'User login successful');

// Log error
await log('backend', 'error', 'handler', 'Database connection failed');

// Log warning
await log('frontend', 'warn', 'api', 'Slow API response detected');
```

## API Endpoint
`POST http://20.207.122.201/evaluation-service/logs`

### Request Body Format
```json
{
    "stack": "backend",
    "level": "info",
    "package": "handler",
    "message": "Log message here"
}
```

### Success Response
```json
{
    "logID": "a4aad02e-19d0-4153-86d9-58bf55d7c402",
    "message": "log created successfully"
}
```

## Authentication
- Uses Basic Auth with CLIENT_ID and CLIENT_SECRET
- Automatically exchanges for Bearer token
- Token expires after configured duration

## Error Handling
- Returns `null` on authentication failure
- Logs error messages to console
- Continues execution without throwing exceptions

## Integration
Used in `server.js` to log all endpoint accesses:

```javascript
app.get('/example', async (req, res) => {
    try {
        await log('backend', 'info', 'controller', 'Successfully accessed example endpoint');
        res.send('Hello World');
    } catch (error) {
        await log('backend', 'error', 'handler', 'Error occurred');
        res.status(500).send('Internal Server Error');
    }
});
```

![alt text](<Screenshot 2026-05-05 150823.png>) </br></br></br></br>
![alt text](<Screenshot 2026-05-05 141741.png>)</br></br></br></br>
 ![alt text](<Screenshot 2026-05-05 141823.png>) </br></br></br></br>
 ![alt text](<Screenshot 2026-05-05 142505.png>)</br></br></br></br>