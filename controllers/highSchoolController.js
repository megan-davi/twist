var HighSchool = require('../models/highSchool');
var Participant = require('../models/participant');
var async = require('async');

// Import validation and sanitization methods
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 🏠 Displays home page
exports.index = function(req, res) {

    async.parallel({
        highSchoolCount: function(callback) {
            HighSchool.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        participantCount: function(callback) {
            Participant.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'TWIST Home', error: err, data: results });
    });
};

// 👀 Display list of all high schools.
exports.highSchoolList = function(req, res, next) {
  HighSchool.find({})
    .exec(function (err, results) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('highSchoolList', { title: 'High School List', highSchoolList: results });
    });
};


// 👀 Display detail page for a specific high school.
exports.highSchoolDetail = function(req, res, next) {
    async.parallel({
        highSchool: function(callback) {
            HighSchool.findById(req.params.id)
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.highSchool==null) { // No results.
            var err = new Error('High School not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('highSchoolDetail', { title: 'High School Detail', highSchool: results.highSchool } );
    });
};


// ⭐️ Display high school create form on GET.
exports.highSchoolCreateGet = function(req, res, next) {
    async.parallel({
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('highSchoolForm', { title: 'Create High School' });
    });
};

// ⭐️ Handle high school create on POST.
exports.highSchoolCreatePost = [
    // Validate fields.
    body('highSchoolName', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('address').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a high school object with escaped and trimmed data.
        var highSchool = new HighSchool(
          { highSchoolName: req.body.highSchoolName,
            address: req.body.address,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
            }, function(err, results) {
                    if (err) { return next(err); }
                res.render('highSchoolForm', { title: 'Create High School', highSchool: results.highSchool, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save high school.
            highSchool.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new high school record.
                   res.redirect(highSchool.url);
                });
        }
    }
];

// ❌ Display high school delete form on GET.
exports.highSchoolDeleteGet = function(req, res) {
  async.parallel({
            highSchool: function(callback) {
                HighSchool.findById(req.params.id).exec(callback)
            },
        }, function(err, results) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('highSchoolDelete', { title: 'Delete High School', highSchool: results.highSchool } );
        });
    };

// ❌ Handle high school delete on POST.
exports.highSchoolDeletePost = function(req, res) {
    async.parallel({
        highSchool: function(callback) {
          HighSchool.findById(req.body.highschoolid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        HighSchool.findByIdAndRemove(req.body.highschoolid, function deletehighSchool(err) {
           if (err) { return next(err); }
            //Success - go to High School list
           res.redirect('/twist/highschool')
           })
        });
};


// 🔄 Display highSchool update form on GET.
exports.highSchoolUpdateGet = function(req, res, next) {

    // Get highSchool, and participant for form.
    async.parallel({
        highSchool: function(callback) {
            highSchool.findById(req.params.id).exec(callback);
        }},
         function(err, results) {
            if (err) { return next(err); }
            if (results.highSchool==null) { // No results.
                var err = new Error('highSchool not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('highSchool_form', { title: 'Update High School', highSchool: results.highSchool });
        });

};

// 🔄 Handle highSchool update on POST.
exports.highSchoolUpdatePost = [

    // Convert the participants to an array
    (req, res, next) => {
        if(!(req.body.participants instanceof Array)){
            if(typeof req.body.participants==='undefined')
            req.body.participants=[];
            else
            req.body.participants=new Array(req.body.participants);
        }
        next();
    },
   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),
    sanitizeBody('participants.*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a highSchool object with escaped/trimmed data and old id.
        var highSchool = new highSchool(
          { title: req.body.title,
            participants: (typeof req.body.participants==='undefined') ? [] : req.body.participants,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all participants for form.
            async.parallel({
                participants: function(callback) {
                    participant.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected participants as checked.
                for (let i = 0; i < results.participants.length; i++) {
                    if (highSchool.genre.indexOf(results.participants[i]._id) > -1) {
                        results.participants[i].checked='true';
                    }
                }
                res.render('highSchool_form', { title: 'Update High School', participants:results.participants, highSchool: highSchool, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            highSchool.findByIdAndUpdate(req.params.id, highSchool, {}, function (err,highSchool) {
                if (err) { return next(err); }
                   // Successful - redirect to highSchool detail page.
                   res.redirect(highSchool.url);
                });
        }
    }
];