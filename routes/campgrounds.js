var express = require('express'),
    router = express.Router(),
    middleware = require('../middleware');

var Campground = require('../models/campground');

router.get('/', function(request, response) {
    Campground.find({}, function(err, foundCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            response.render('campgrounds/index', {
                campgrounds: foundCampgrounds
            });
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(request, response) {
    response.render('campgrounds/new');
});

router.post('/', middleware.isLoggedIn, function(request, response) {
    var name = request.body.name;
    var image = request.body.image;
    var description = request.body.description;
    Campground.create({
        name: name,
        image: image,
        author: {
            id: request.user._id,
            username: request.user.username
        },
        description: description
        }, function(err, newCampground) {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/campgrounds');
            }
    });
});

router.get('/:id', function(request, response) {
    Campground.findById(request.params.id)
              .populate('comments')
              .exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            response.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});

module.exports = router;
