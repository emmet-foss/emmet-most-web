import Client from './helpers/client'
require('dotenv').config()

const emmetUrl = process.env.REACT_APP_EMMET_API || 'http://localhost:3001';
const api = new Client(emmetUrl);

export default api;