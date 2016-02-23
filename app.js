var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    seedDB = require('./seeds');

var Comment = require('./models/comment'),
    Campground = require('./models/campground'),
    User = require('./models/user');

// wipe and re-seed database for testing
seedDB();

mongoose.connect('mongodb://localhost/yelpcamp');

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: "correct horse battery staple",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// index page
app.get('/', function(request, response) {
    response.render('landing');
});

// campground routes
app.get('/campgrounds', function(request, response) {
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
    response.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(request, response) {
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

// comment routes
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            response.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(request, response) {
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

// authentication routes
app.get('/register', function(request, response) {
    response.render('users/new');
});

app.post('/register', function(request, response) {
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

app.get('/login', function(request, response) {
    response.render('users/login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}));

app.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/campgrounds');
});

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect('/login');
    }
}

app.listen(3000, function() {
    console.log("Listening for YelpCamp app on port 3000.");
});
