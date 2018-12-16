var Presenter = require('../models/presenter');
var async = require('async');

// Import validation and sanitization methods
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// 👀 Display list of all presenters.
exports.presenterList = function(req, res, next) {
  Presenter.find()
    .sort([['lastName', 'ascending']])
    .exec(function (err, presenterListFunction) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('presenterList', { title: 'Presenter List', presenterList: presenterListFunction });
    });
};

// 👀 Display detail page for a specific presenter.
exports.presenterDetail = function(req, res, next) {
    async.parallel({
        presenter: function(callback) {
            Presenter.findById(req.params.id)
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.presenter==null) { // No results.
            var err = new Error('presenter not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('presenterDetail', { title: 'Presenter Detail', presenter: results.presenter } );
    });
};

// ⭐️ Display presenter create form on GET.
exports.presenterCreateGet = function(req, res, next) {
    async.parallel({
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('presenterForm', { title: 'Create Presenter' });
    });

};

// ⭐️ Handle presenter create on POST.
exports.presenterCreatePost = [
    // Validate fields.
    body('firstName', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('lastName', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('occupation').isLength({ min: 1 }).trim(),
    body('mainPhone').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a presenter object with escaped and trimmed data.
        var presenter = new Presenter(
          { firstName: req.body.firstName,
            lastName: req.body.lastName,
            occupation: req.body.occupation,
            mainPhone: req.body.mainPhone,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
            }, function(err, results) {
                    if (err) { return next(err); }
                res.render('presenterForm', { title: 'Create Presenter', presenter: results.presenter, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save presenter.
            presenter.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new presenter record.
                   res.redirect(presenter.url);
                });
        }
    }
];

// ❌ Display presenter delete form on GET.
exports.presenterDeleteGet = function(req, res) {
    async.parallel({
        presenter: function(callback) {
            presenter.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.presenter==null) { // No results.
            res.redirect('/twist/presenter');
        }
        // Successful, so render.
        res.render('presenterDelete', { title: 'Delete presenter', presenter: results.presenter } );
    });
};

// ❌ Handle presenter delete on POST.
exports.presenterDeletePost = function(req, res) {
    async.parallel({
        presenter: function(callback) {
            presenter.findById(req.body.presenterid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        presenter.findByIdAndRemove(req.body.presenterid, function deletepresenter(err) {
            if (err) { return next(err); }
            // Success - go to presenter list
            res.redirect('/twist/presenter')
            })
        });
};

// 🔄 Display presenter update form on GET.
exports.presenterUpdateGet = function(req, res, next) {

    // Get presenter for form.
    async.parallel({
        presenter: function(callback) {
            presenter.findById(req.params.id).exec(callback);
        }},
         function(err, results) {
            if (err) { return next(err); }
            if (results.presenter==null) { // No results.
                var err = new Error('presenter not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('presenter_form', { title: 'Update Presenter', presenter: results.presenter });
        });

};

// 🔄 Handle pressesnter update on POST.
exports.presenterUpdatePost = [

   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a pressesnter object with escaped/trimmed data and old id.
        var pressesnter = new pressesnter(
          { title: req.body.title,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all pressesnter for form.
            async.parallel({
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('pressesnter_form', { title: 'Update Pressenter', pressesnter: pressesnter, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            pressesnter.findByIdAndUpdate(req.params.id, pressesnter, {}, function (err,pressesnter) {
                if (err) { return next(err); }
                   // Successful - redirect to pressesnter detail page.
                   res.redirect(pressesnter.url);
                });
        }
    }
];
