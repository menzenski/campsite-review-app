var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
  { name: "Salmon River",
    image: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg" },
  { name: "Pulaski",
    image: "https://farm8.staticflickr.com/7503/15623542806_8058899c7d.jpg" },
  { name: "Flint Hills",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg" },
  { name: "Sapsucker Woods",
    image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg" }
    ];

app.get('/', function(request, response) {
    response.render('landing');
});

app.get('/campgrounds', function(request, response) {
    response.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(request, response) {
    var name = request.body.name;
    var image = request.body.image;
    campgrounds.push({name: name, image: image});
    response.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(request, response) {
    response.render('new');
});

app.listen(3000, function() {
    console.log("Listening for app on port 3000");
});
