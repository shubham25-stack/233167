import axios from 'axios';

const NOTIFICATIONS_API = 'http://20.207.122.201/evaluation-service/notifications';
const AUTH_API = 'http://20.207.122.201/evaluation-service/auth';
const CLIENT_ID = '0ea1740c-7bfe-4faf-a855-44cbbba47525';
const CLIENT_SECRET = 'ASXxmhNFjvnbaAAZ';

async function getAuthToken() {
    try {
        const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const response = await axios.post(AUTH_API, '', {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Auth error:', error.message);
        return null;
    }
}

export async function createNotification(notification) {
    try {
        const token = await getAuthToken();
        if (!token) throw new Error('Auth failed');

        const response = await axios.post(NOTIFICATIONS_API, notification, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Create notification failed:', error.message);
        return null;
    }
}

export async function getAllNotifications() {
    try {
        const token = await getAuthToken();
        if (!token) throw new Error('Auth failed');

        const response = await axios.get(NOTIFICATIONS_API, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Get notifications failed:', error.message);
        return [];
    }
}

export async function getNotificationById(id) {
    try {
        const token = await getAuthToken();
        if (!token) throw new Error('Auth failed');

        const response = await axios.get(`${NOTIFICATIONS_API}/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Get notification failed:', error.message);
        return null;
    }
}
