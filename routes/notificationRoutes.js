import express from 'express';
import { createNotification, getAllNotifications, getNotificationById } from '../services/notificationService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, message, userRole } = req.body;
        if (!title || !message || !userRole) {
            return res.status(400).json({ error: 'Title, message, and userRole required' });
        }
        const result = await createNotification({ title, message, userRole, createdAt: new Date() });
        res.status(result ? 201 : 500).json(result ? { message: 'Created', data: result } : { error: 'Failed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const notifications = await getAllNotifications();
        res.status(200).json({ data: notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const notification = await getNotificationById(req.params.id);
        res.status(notification ? 200 : 404).json(notification ? { data: notification } : { error: 'Not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
