import Client from './helpers/client'
const emmetUrl = process.env.EMMET_API || 'http://localhost:3001';

const api = new Client(emmetUrl);

export default api;