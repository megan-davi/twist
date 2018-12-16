var Topic = require('../models/topic');
var async = require('async');

// Import validation and sanitization methods
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 👀 Display list of all topics.
exports.topicList = function(req, res, next) {
  Topic.find({})
    .exec(function (err, results) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('topicList', { title: 'Topic List', topicList: results });
    });
};

// 👀 Display detail page for a specific topic.
exports.topicDetail = function(req, res, next) {
    async.parallel({
        topic: function(callback) {
            Topic.findById(req.params.id)
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.topic==null) { // No results.
            var err = new Error('Topic not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('topicDetail', { title: 'Topic Detail', topic: results.topic } );
    });
};

// ⭐️ Display topic create form on GET.
exports.topicCreateGet = function(req, res, next) {
    async.parallel({
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('topicForm', { title: 'Create Topic' });
    });

};

// ⭐️ Handle topic create on POST.
exports.topicCreatePost = [
    // Validate fields.
    body('title', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('description').isLength({ min: 1 }).trim(),
    body('presenter').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a topic object with escaped and trimmed data.
        var topic = new Topic(
          { title: req.body.title,
            description: req.body.description,
            presenter: req.body.presenter,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
            }, function(err, results) {
                    if (err) { return next(err); }
                res.render('topicForm', { title: 'Create Topic', topic: results.topic, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save topic.
            topic.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new topic record.
                   res.redirect(topic.url);
                });
        }
    }
];

// ? Display topic delete form on GET.
exports.topicDeleteGet = function(req, res, next) {

    async.parallel({
        topic: function(callback) {
            topic.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.topic==null) { // No results.
            res.redirect('/twist/topic');
        }
        // Successful, so render.
        res.render('topicDelete', { title: 'Delete topic', topic: results.topic } );
    });
};

// ? Handle topic delete on POST.
exports.topicDeletePost = function(req, res, next) {

    async.parallel({
        topic: function(callback) {
            topic.findById(req.body.topicid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        topic.findByIdAndRemove(req.body.topicid, function deletetopic(err) {
            if (err) { return next(err); }
            // Success - go to room list
            res.redirect('/twist/topic')
            })
        });
};

// Display topic update form on GET.
exports.topicUpdateGet = function(req, res, next) {

    // Get topic for form.
    async.parallel({
        topic: function(callback) {
            topic.findById(req.params.id).exec(callback);
        }},
         function(err, results) {
            if (err) { return next(err); }
            if (results.topic==null) { // No results.
                var err = new Error('topic not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('topic_form', { title: 'Update Topic', topic: results.topic });
        });

};

// Handle topic update on POST.
exports.topicUpdatePost = [

   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a topic object with escaped/trimmed data and old id.
        var topic = new topic(
          { title: req.body.title,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all topic for form.
            async.parallel({
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('topic_form', { title: 'Update Topic', topic: topic, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            topic.findByIdAndUpdate(req.params.id, topic, {}, function (err,topic) {
                if (err) { return next(err); }
                   // Successful - redirect to topic detail page.
                   res.redirect(topic.url);
                });
        }
    }
];
