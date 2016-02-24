var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    seedDB = require('./seeds');
    secretObject = require('./secret');

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

var dbURL = process.env.FOURBEARSDATABASEURL || 'mongodb://localhost/yelpcamp';
mongoose.connect(dbURL);

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(expressSession(secretObject));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass current user and any flash messages through to all routes
app.use(function (request, response, next) {
    response.locals.currentUser = request.user;
    response.locals.error = request.flash('error');
    response.locals.success = request.flash('success');
    next();
});

// use routes
app.use('/', mainRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments/', commentRoutes);
app.use('/', userRoutes);

// handle errors
app.use(function(request, response) {
    response.status(400);
    response.render('404', {title: '404: File Not Found'});
});
app.use(function(error, request, response, next) {
    response.status(500);
    response.render('500', {
        title: '500: Internal Server Error',
        error: error
    });
});

app.listen(process.env.PORT || 3000);
