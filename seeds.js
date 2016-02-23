var mongoose = require('mongoose'),
    Comment = require('./models/comment'),
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
    },
    {
        name: 'Santa Elena Natural Preserve',
        image: 'https://farm9.staticflickr.com/8497/8368726018_2b552c5a77.jpg',
        description: 'Monteverde Cloud Forest, Costa Rica.'
    },
    {
        name: 'Mosquito Creek',
        image: 'https://farm8.staticflickr.com/7749/17924239438_f354a0131c.jpg',
        description: ''
    },
    {
        name: 'La Junta',
        image: 'https://farm9.staticflickr.com/8691/16634402597_dc44c7cb76.jpg',
        description: ''
    },
    {
        name: 'Colorado River Campsite',
        image: 'https://farm4.staticflickr.com/3061/2324743268_6df1a7504d.jpg',
        description: ''
    },
    {
        name: 'Lake Lillian Campsite',
        image: 'https://farm1.staticflickr.com/370/19308022642_291bece7fa.jpg',
        description: ''
    },
    {
        name: 'Burr Point Campsite',
        image: 'https://farm7.staticflickr.com/6211/6272469585_8a1c267b06.jpg',
        description: ''
    },
    {
        name: 'Little L.O. Trail No. 6',
        image: 'https://farm8.staticflickr.com/7767/17984691780_f2cf441d2c.jpg',
        description: 'One of several campsites between Geronimo Spring '+
            'and Sycamore Creek along Little Lookout (L.O.) Trail. ' +
            'Photograph by Deborah Lee Soltesz. Credit USDA Forest ' +
            'Service, Coconino National Forest.'
    }
];

function seedDB() {
    // remove existing campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds in the database.");
            /*
            // populate database with starter campgrounds
            starterCampgrounds.forEach(function(camp) {
                Campground.create(camp, function(err, site) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added the '" + camp.name + "' campground.");
                        // create a comment
                        Comment.create({
                            text: "Nice place, but needs wifi.",
                            author: "Harry P."
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                site.comments.push(comment);
                                site.save();
                                console.log('Successfully created a comment.');
                            }
                        });
                    }
                });
            });
            */
        }
    });
}

module.exports = seedDB;
