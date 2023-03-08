// const app = require("express/lib/application");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const  express = require('./config/express'), passport = require('./config/passport');
const app = express();
// const passport = passport();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');
