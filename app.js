var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelpcamp');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// DB Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

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
    Campground.findById(request.params.id, function(err, foundCampground) {
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
