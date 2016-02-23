var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    seedDB = require('./seeds');

// models
var Comment = require('./models/comment'),
    Campground = require('./models/campground'),
    User = require('./models/user');

// routes
var mainRoutes = require('./routes/main'),
    campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    userRoutes = require('./routes/users');

// wipe and re-seed database for testing
// seedDB();

mongoose.connect('mongodb://localhost/yelpcamp');

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
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

// pass current user through to all routes
app.use(function (request, response, next) {
    response.locals.currentUser = request.user;
    next();
});

// use routes
app.use('/', mainRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments/', commentRoutes);
app.use('/', userRoutes);

app.listen(3000, function() {
    console.log("Listening for YelpCamp app on port 3000.");
});
