var express = require('express'),
    router = express.Router();

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

router.post('/', function(request, response) {
    var name = request.body.name;
    var image = request.body.image;
    var description = request.body.description;
    Campground.create({
        name: name,
        image: image,
        description: description
        }, function(err, newCampground) {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/campgrounds');
            }
    });
});

router.get('/new', function(request, response) {
    response.render('campgrounds/new');
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
