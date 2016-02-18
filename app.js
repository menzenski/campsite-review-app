var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    seedDB = require('./seeds');

var Comment = require('./models/comment'),
    Campground = require('./models/campground');

// wipe and re-seed database for testing
seedDB();

mongoose.connect('mongodb://localhost/yelpcamp');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('landing');
});

app.get('/campgrounds', function(request, response) {
    Campground.find({}, function(err, foundCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            response.render('index', {campgrounds: foundCampgrounds});
        }
    });
});

app.post('/campgrounds', function(request, response) {
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

app.get('/campgrounds/new', function(request, response) {
    response.render('new');
});

app.get('/campgrounds/:id', function(request, response) {
    Campground.findById(request.params.id)
              .populate('comments')
              .exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            response.render('show', {campground: foundCampground});
        }
    });
});

app.listen(3000, function() {
    console.log("Listening for app on port 3000");
});
