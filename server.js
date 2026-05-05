import express, { json } from 'express';
import { log } from './middleware/logger.js';
import notificationRoutes from './routes/notificationRoutes.js';

const app = express();
app.use(json({ strict: false }));

// Notification routes
app.use('/notifications', notificationRoutes);

app.get('/example', async (req, res) => {
    try {
        await log('backend', 'info', 'controller', 'Successfully accessed example endpoint');
        res.send('Hello World');
    } catch (error) {
        await log('backend', 'error', 'handler', 'Error occurred while accessing example endpoint');
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
