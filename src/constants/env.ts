export const isDevelopment = process.env.NODE_ENV === 'development';

const API_HOST = isDevelopment ? 'localhost' : 'api_service';

export const API_URL = `http://${API_HOST}:8000`;
