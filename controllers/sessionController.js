var Session = require('../models/session');
var async = require('async');

// Import validation and sanitization methods
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 👀 Display list of all sessions.
exports.sessionList = function(req, res, next) {

  Session.find()
    .exec(function (err, sessionListFunction) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('sessionList', { title: 'Session List', sessionList: sessionListFunction });
    });

};

// 👀 Display detail page for a specific session.
exports.sessionDetail = function(req, res, next) {
    async.parallel({
        session: function(callback) {
            Session.findById(req.params.id)
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.session==null) { // No results.
            var err = new Error('Session not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('sessionDetail', { title: 'Session Detail', session: results.session } );
    });
};

// ⭐️ Display session create form on GET.
exports.sessionCreateGet = function(req, res, next) {
    async.parallel({
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('sessionForm', { title: 'Create Session' });
    });
};

// ⭐️ Handle session create on POST.
exports.sessionCreatePost = [
    // Validate fields.
    body('time', 'Time must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a session object with escaped and trimmed data.
        var session = new Session(
          { time: req.body.time,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
            }, function(err, results) {
                    if (err) { return next(err); }
                res.render('sessionForm', { title: 'Create Session', session: results.session, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save session.
            session.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new session record.
                   res.redirect(session);
                });
        }
    }
];

// ? Display session delete form on GET.
exports.sessionDeleteGet = function(req, res, next) {

    async.parallel({
        session: function(callback) {
            session.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.session==null) { // No results.
            res.redirect('/twist/session');
        }
        // Successful, so render.
        res.render('sessionDelete', { title: 'Delete session', session: results.session } );
    });
};

// ? Handle session delete on POST.
exports.sessionDeletePost = function(req, res, next) {

    async.parallel({
        session: function(callback) {
            session.findById(req.body.sessionid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        session.findByIdAndRemove(req.body.sessionid, function deletesession(err) {
            if (err) { return next(err); }
            // Success - go to room list
            res.redirect('/twist/session')
            })
        });
};

// Display session update form on GET.
exports.sessionUpdateGet = function(req, res, next) {

    // Get session for form.
    async.parallel({
        session: function(callback) {
            session.findById(req.params.id).exec(callback);
        }},
         function(err, results) {
            if (err) { return next(err); }
            if (results.session==null) { // No results.
                var err = new Error('session not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('session_form', { title: 'Update Session', session: results.session });
        });

};

// Handle session update on POST.
exports.sessionUpdatePost = [

   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a session object with escaped/trimmed data and old id.
        var session = new session(
          { title: req.body.title,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all session for form.
            async.parallel({
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('session_form', { title: 'Update Schedule', session: session, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            session.findByIdAndUpdate(req.params.id, session, {}, function (err,session) {
                if (err) { return next(err); }
                   // Successful - redirect to session detail page.
                   res.redirect(session.url);
                });
        }
    }
];
