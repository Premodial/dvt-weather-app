import axios from 'axios';
import {ErrorDetails } from '../../models/errors';

const api = axios.create({
  baseURL: process.env.LOGGER_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export async function logErrorToServer(errorDetails: ErrorDetails): Promise<void> {
  console.log(errorDetails.message);
  try {
    const response = await api.post('/api/logger', 
      {
        "message": errorDetails.message,
        "stack": errorDetails.stack,
      }
    );
  } catch (error: any) {
    console.error('Failed to log error:', error.message || error);
  }
}
