var express = require('express'),
    router = express.Router({mergeParams: true}),
    middleware = require('../middleware');

var Comment = require('../models/comment'),
    Campground = require('../models/campground');

router.get('/new', middleware.isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            response.render('comments/new', {campground: campground});
        }
    });
});

router.post('/', middleware.isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(request.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    response.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

module.exports = router;
