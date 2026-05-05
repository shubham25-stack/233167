import axios from 'axios';

const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';

export async function log(stack, level, pkg, message) {
    // Validate inputs
    const validStacks = ['backend', 'frontend'];
    const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const backendPackages = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];
    const frontendPackages = ['api', 'component', 'hook', 'page', 'state', 'style'];
    const bothPackages = ['auth', 'config', 'middleware', 'utils'];

    if (!validStacks.includes(stack)) {
        throw new Error(`Invalid stack: ${stack}`);
    }
    if (!validLevels.includes(level)) {
        throw new Error(`Invalid level: ${level}`);
    }
    if (stack === 'backend' && ![...backendPackages, ...bothPackages].includes(pkg)) {
        throw new Error(`Invalid package for backend: ${pkg}`);
    }
    if (stack === 'frontend' && ![...frontendPackages, ...bothPackages].includes(pkg)) {
        throw new Error(`Invalid package for frontend: ${pkg}`);
    }

    const logData = {
        stack,
        level,
        package: pkg,
        message,
    };

    try {
        const response = await axios.post(LOG_API_URL, logData);
        console.log('Log created successfully:', response.data);
    } catch (error) {
        console.error('Failed to log:', error);
    }
}

