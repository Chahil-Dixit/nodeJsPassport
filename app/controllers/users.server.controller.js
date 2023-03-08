const User = require('mongoose').model('User');
const passport = require('passport');
// returns a unified error message from a Mongoose error object
let getErrorMessage = function (err) {
    let message = '';
    if (err.code) {
        switch (err.code) {
            //using error codes
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        // a Mongoose validation error
        for (let errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};
exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('index', {title: 'Sign-in Form', messages: req.flash('error') || req.flash('info'), userFullName: 'Chahil'});
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {title: 'Sign-up Form', messages: req.flash('error')});
    } else {
        return res.redirect('/');
    }
};
exports.signup = function (req, res, next) {
    //uses user model to create new //users
    if (!req.user) {
        let user = new User(req.body);
        let message = null;
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                let message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                //req.loginis Passport method
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};
exports.signout = function (req, res) {
    req.logout(); //invalidate the authenticated session using a Passport method
    res.redirect('/');
}
