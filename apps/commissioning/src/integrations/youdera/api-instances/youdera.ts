import axios from 'axios';

export const youderaApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_YOUDERA_API_BASE,
  withCredentials: process.env.NEXT_PUBLIC_YOUDERA_AUTH_METHOD === 'SESSION',
});
