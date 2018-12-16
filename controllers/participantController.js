var Participant = require('../models/participant');
var HighSchool = require('../models/highSchool');
var async = require('async');

// Import validation and sanitization methods
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 👀 Display list of all participants.
exports.participantList = function(req, res, next) {

  Participant.find()
    .sort([['lastName', 'ascending']])
    .exec(function (err, participantListFunction) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('participantList', { title: 'Participant List', participantList: participantListFunction });
    });

};

// 👀 Display detail page for a specific participant.
exports.participantDetail = function(req, res, next) {
    async.parallel({
        participant: function(callback) {
            Participant.findById(req.params.id)
              .exec(callback)
        },
        highSchool: function(callback) {
            HighSchool.find({ 'highSchoolName': req.params.id }, 'highSchoolName')
            .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.participant==null) { // No results.
            var err = new Error('Participant not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('participantDetail', { title: 'Participant Detail', participant: results.participant, highSchool: results.highSchool } );
    });
};

// ⭐️ Display participant create form on GET.
exports.participantCreateGet = function(req, res, next) {
    async.parallel({
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('participantForm', { title: 'Register New TWIST Participant' });
    });
};

// ⭐️ Handle participant create on POST.
exports.participantCreatePost = [
    // Validate fields.
    body('firstName', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('lastName', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('email').isLength({ min: 1 }).trim(),
    body('address').isLength({ min: 1 }).trim(),
    body('participantType').isLength({ min: 1 }).trim(),
    //body('highSchool').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a participant object with escaped and trimmed data.
        var participant = new Participant(
          { firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            participantType: req.body.participantType,
            //highSchool: req.body.highSchool,
            address: req.body.address,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
            }, function(err, results) {
                    if (err) { return next(err); }
                res.render('participantForm', { title: 'Register New TWIST Participant', participant: results.participant, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save participant.
            participant.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new participant record.
                   res.redirect(participant.url);
                });
        }
    }
];

// ❌ Display participant delete form on GET.
exports.participantDeleteGet = function(req, res, next) {

    async.parallel({
        participant: function(callback) {
            Participant.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.participant==null) { // No results.
            res.redirect('/twist/participant');
        }
        // Successful, so render.
        res.render('participantDelete', { title: 'Delete Participant', participant: results.participant } );
    });
};

// ❌ Handle participant delete on POST.
exports.participantDeletePost = function(req, res, next) {

    async.parallel({
        participant: function(callback) {
          Participant.findById(req.body.participantid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        Participant.findByIdAndRemove(req.body.participantid, function deleteParticipant(err) {
            if (err) { return next(err); }
            // Success - go to participant list
            res.redirect('/twist/participant')
            })
        });
};

// 🔄 Display participant update form on GET.
exports.participantUpdateGet = function(req, res, next) {

    // Get participant for form.
    async.parallel({
        participant: function(callback) {
            Participant.findById(req.params.id).exec(callback);
        }},
         function(err, results) {
            if (err) { return next(err); }
            if (results.participant==null) { // No results.
                var err = new Error('participant not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('participantForm', { title: 'Update Participant', participant: results.participant });
        });

};

// 🔄 Handle participant update on POST.
exports.participantUpdatePost = [
    // Validate fields.
    body('firstName', 'First name must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a participant object with escaped/trimmed data and old id.
        var participant = new Participant(
          { firstName: req.body.firstName,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all participants for form.
            async.parallel({
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('participantForm', { title: 'Update Participant', participant: results.participant, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Participant.findByIdAndUpdate(req.params.id, participant, {}, function (err,theParticipant) {
                if (err) { return next(err); }
                   // Successful - redirect to participant detail page.
                   res.redirect(theParticipant.url);
                });
        }
    }
];
