import Client from './helpers/client'
require('dotenv').config()

const emmetUrl = process.env.EMMET_API || 'http://localhost:3001';
console.log(emmetUrl)

const api = new Client(emmetUrl);

export default api;