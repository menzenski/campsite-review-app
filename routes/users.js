var express = require('express'),
    router = express.Router(),
    passport = require('passport');

var User = require('../models/user');

router.get('/register', function(request, response) {
    response.render('users/new');
});

router.post('/register', function(request, response) {
    var newUser = new User({username: request.body.username});
    User.register(newUser, request.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return response.render('users/new')
        } else {
            passport.authenticate('local')(request, response, function() {
                response.redirect('/campgrounds');
            });
        }
    });
});

router.get('/login', function(request, response) {
    response.render('users/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}));

router.get('/logout', function(request, response) {
    request.logout();
    request.flash('success', "Logged out successfully.");
    response.redirect('/campgrounds');
});

module.exports = router;
