module.exports = {
    isLoggedIn: function(request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        } else {
            response.redirect('/login');
        }
    }
}
