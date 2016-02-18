var mongoose = require('mongoose'),
    Campground = require('./models/campground');

var starterCampgrounds = [
    {
        name: 'Carrizo Plain National Monument',
        image: 'https://farm2.staticflickr.com/1346/1226282292_3c9a577db6_z.jpg',
        description: 'Photo by Alan Schmierer (licensed CC0).'
    },
    {
        name: 'Coconino National Forest',
        image: 'https://farm1.staticflickr.com/735/21869544276_7f08298928.jpg',
        description: 'The Inner Basin Trail ascends from Lockett Meadow ' +
            'into the caldera of the San Francisco Peaks, an extinct ' +
            'volcano and home of the tallest peaks in Arizona. The ' +
            'first 1.7 miles of the trail winds through the extensive ' +
            'aspen forest flanking the upper reaches of the Peaks, ' +
            'joining the Waterline Trail briefly before following a jeep ' +
            'road into the caldera. The trail starts at an elevation of ' +
            '8665 feet, gaining approximately 1200 feet over 2 miles on ' +
            'its way into the Inner Basin. The trail continues another ' +
            '2 miles, gaining an additional 600 feet or so to join up ' +
            'with the Weatherford Trail.'
    },
    {
        name: 'Knoll Lake',
        image: 'https://farm1.staticflickr.com/261/19120057560_79e1578798.jpg',
        description: 'This secluded forest lake is surrounded by ' +
            'ponderosa pines, with a picturesque island in the center. ' +
            'Knoll Lake provides a scenic setting for picnicking, ' +
            'fishing, canoeing, and other activities. The nearby ' +
            'campground, trails, and Mogollon Rim make Knoll Lake a ' +
            'peaceful getaway with plenty to see and do.'
    },
    {
        name: 'Stafford Camp',
        image: 'https://farm1.staticflickr.com/79/228376069_fadcc1c2e9.jpg',
        description: "Here's my camp site, I slept in a camping hammock, " +
            "the red thing is a water storage pouch."
    }
];

function seedDB() {
    // remove existing campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds in the database.");
            // populate database with starter campgrounds
            starterCampgrounds.forEach(function(camp) {
                Campground.create(camp, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added the '" + camp.name + "' campground.");
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
