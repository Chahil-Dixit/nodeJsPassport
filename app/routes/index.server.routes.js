let index = require('../../app/controllers/index.server.controller'), passport = require('passport');
module.exports = function (app) {
    app.route('/index').get(index.renderIndex);
};
