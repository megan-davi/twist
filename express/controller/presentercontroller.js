var presenter = require('../models/presenter');


// Display list of all presenter.
exports.presenter_list = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter list');
};

// Display detail page for a specific presenter.
exports.presenter_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter detail: ' + req.params.id);
};

// Display presenter create form on GET.
exports.presenter_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter create GET');
};

// Handle presenter create on POST.
exports.presenter_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter create POST');
};

// Display presenter delete form on GET.
exports.presenter_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter delete GET');
};

// Handle presenter delete on POST.
exports.presenter_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter delete POST');
};

// Display presenter update form on GET.
exports.presenter_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter update GET');
};

// Handle presenter update on POST.
exports.presenter_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: presenter update POST');
};