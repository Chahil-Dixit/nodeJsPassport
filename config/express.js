const config = require('config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require("mongoose");
module.exports = function () {
    const app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    mongoose.connect('mongodb://localhost:27017/users',
        {
            useNewUrlParser: true,
        }
    );
    require('../app/models/User');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(flash());
    app.use(methodOverride());
    app.use(session({saveUninitialized: true, resave: true, secret: 'admin'}));
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.use(passport.initialize()); //bootstrapping the Passport module
    app.use(passport.session()); //keep track of your user's session
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    app.use(express.static('./public'));

    return app;
};
