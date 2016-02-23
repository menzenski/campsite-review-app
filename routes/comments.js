var express = require('express'),
    router = express.Router({mergeParams: true}),
    mw = require('../middleware');

var Comment = require('../models/comment'),
    Campground = require('../models/campground');

router.get('/new', mw.isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            response.render('comments/new', {campground: campground});
        }
    });
});

router.post('/', mw.isLoggedIn, function(request, response) {
    Campground.findById(request.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(request.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = request.user._id;
                    comment.author.username = request.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    response.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

router.get('/:comment_id/edit', mw.checkCommentOwnership, function(request, response) {
    Comment.findById(request.params.comment_id, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            response.render('comments/edit', {
                comment: comment,
                campground_id: request.params.id
            });
        }
    });
});

router.put('/:comment_id', mw.checkCommentOwnership, function(request, response) {
    Comment.findByIdAndUpdate(
        request.params.comment_id, request.body.comment, function(err, comment) {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/campgrounds/' + request.params.id);
            }
        }
    );
});

router.delete('/:comment_id', mw.checkCommentOwnership, function(request, response) {
    Comment.findByIdAndRemove(request.params.comment_id, function(err) {
        if (err) {
            console.log(err);
        }
        response.redirect('/campgrounds/' + request.params.id);
    })
});

module.exports = router;
