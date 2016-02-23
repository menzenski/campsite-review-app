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

router.get('/:id/edit', function(request, response) {
    Campground.findById(request.params.id, function(err, camp) {
        if (err) {
            console.log(err);
        } else {
            response.render('campgrounds/edit', {campground: camp});
        }
    });
});

router.put('/:id', function(request, response) {
    Campground.findByIdAndUpdate(
        request.params.id, request.body.campground, function (err, camp) {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/campgrounds/' + request.params.id);
            }
        });
});

router.delete('/:id', function(request, response) {
    Campground.findByIdAndRemove(request.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        response.redirect('/campgrounds');
    });
});

module.exports = router;
