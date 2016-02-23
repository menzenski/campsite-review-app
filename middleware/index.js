var Campground = require('../models/campground');

module.exports = {

    isLoggedIn: function(request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        } else {
            response.redirect('/login');
        }
    },

    checkCampgroundOwnership: function(request, response, next) {
        if (request.isAuthenticated()) {
            Campground.findById(request.params.id, function(err, camp) {
                if (err) {
                    console.log(err);
                    response.redirect('back');
                } else {
                    if (camp.author.id.equals(request.user.id)) {
                        next();
                    } else {
                        response.redirect('back');
                    }
                }
            });
        }
    }

}
