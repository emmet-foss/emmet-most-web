require('dotenv').config()
const proxy = require('http-proxy-middleware');
const API_HOST = process.env.API_HOST
module.exports = function(app) {
  app.use(proxy('/api', { target: API_HOST }));
};