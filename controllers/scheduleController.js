var Schedule = require('../models/schedule');
var async = require('async');

// Import validation and sanitization methods
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 👀 Display list of all schedules.
exports.scheduleList = function(req, res, next) {
  Schedule.find()
    .exec(function (err, scheduleListFunction) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('scheduleList', { title: 'Schedule List', scheduleList: scheduleListFunction });
    });
};

// 👀 Display detail page for a specific schedule.
exports.scheduleDetail = function(req, res, next) {
    async.parallel({
        schedule: function(callback) {
            Schedule.findById(req.params.id)
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.room==null) { // No results.
            var err = new Error('schedule not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('scheduleDetail', { title: 'Schedule Detail', schedule: results.schedule } );
    });
};

// ⭐️ Display schedule create form on GET.
exports.scheduleCreateGet = function(req, res, next) {
    async.parallel({
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('scheduleForm', { title: 'Create Schedule' });
    });
};

// ⭐️ Handle schedule create on POST.
exports.scheduleCreatePost = [
    // Validate fields.
    body('session', 'Session must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a high school object with escaped and trimmed data.
        var schedule = new Schedule(
          { session: req.body.highSchoolName,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
            }, function(err, results) {
                    if (err) { return next(err); }
                res.render('scheduleForm', { title: 'Create Schedule', schedule: results.schedule, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save schedule.
            schedule.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new schedule record.
                   res.redirect(schedule.url);
                });
        }
    }
];

// ? Display schedule delete form on GET.
exports.scheduleDeleteGet = function(req, res, next) {

    async.parallel({
        schedule: function(callback) {
            schedule.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.schedule==null) { // No results.
            res.redirect('/twist/schedule');
        }
        // Successful, so render.
        res.render('scheduleDelete', { title: 'Delete schedule', schedule: results.schedule } );
    });
};

// ? Handle schedule delete on POST.
exports.scheduleDeletePost = function(req, res, next) {

    async.parallel({
        schedule: function(callback) {
            schedule.findById(req.body.scheduleid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        schedule.findByIdAndRemove(req.body.scheduleid, function deleteschedule(err) {
            if (err) { return next(err); }
            // Success - go to room list
            res.redirect('/twist/schedule')
            })
        });
};

// Display schedule update form on GET.
exports.scheduleUpdateGet = function(req, res, next) {

    // Get schedule for form.
    async.parallel({
        schedule: function(callback) {
            schedule.findById(req.params.id).exec(callback);
        }},
         function(err, results) {
            if (err) { return next(err); }
            if (results.schedule==null) { // No results.
                var err = new Error('schedule not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('schedule_form', { title: 'Update Schedule', schedule: results.schedule });
        });

};

// Handle schedule update on POST.
exports.scheduleUpdatePost = [   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a schedule object with escaped/trimmed data and old id.
        var schedule = new Schedule(
          { title: req.body.title,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all schedule for form.
            async.parallel({
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('scheduleForm', { title: 'Update Schedule', schedule: results.schedule, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            schedule.findByIdAndUpdate(req.params.id, schedule, {}, function (err,schedule) {
                if (err) { return next(err); }
                   // Successful - redirect to schedule detail page.
                   res.redirect(schedule.url);
                });
        }
    }
];
