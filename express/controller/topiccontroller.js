var topic = require('../models/topic');


// Display list of all topic.
exports.topic_list = function(req, res) {
    res.send('NOT IMPLEMENTED: topic list');
};

// Display detail page for a specific topic.
exports.topic_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: topic detail: ' + req.params.id);
};

// Display topic create form on GET.
exports.topic_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: topic create GET');
};

// Handle topic create on POST.
exports.topic_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: topic create POST');
};

// Display topic delete form on GET.
exports.topic_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: topic delete GET');
};

// Handle topic delete on POST.
exports.topic_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: topic delete POST');
};

// Display topic update form on GET.
exports.topic_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: topic update GET');
};

// Handle topic update on POST.
exports.topic_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: topic update POST');
};