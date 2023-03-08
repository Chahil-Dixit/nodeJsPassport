exports.renderIndex = function (req, res) {
    if (!req.user) {
        res.render('index', {title: 'Sign-in Form', messages: req.flash('error') || req.flash('info'), userFullName: 'Chahil'});
    } else {
        return res.redirect('/');
    }
};
