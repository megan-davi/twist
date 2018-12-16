var participant = require('../models/participant');

// Display list of all participant.
exports.participant_list = function(req, res) {
    res.send('NOT IMPLEMENTED: participant list');
};

// Display detail page for a specific participant.
exports.participant_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: participant detail: ' + req.params.id);
};

// Display participant create form on GET.
exports.participant_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: participant create GET');
};

// Handle participant create on POST.
exports.participant_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: participant create POST');
};

// Display participant delete form on GET.
exports.participant_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: participant delete GET');
};

// Handle participant delete on POST.
exports.participant_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: participant delete POST');
};

// Display participant update form on GET.
exports.participant_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: participant update GET');
};

// Handle participant update on POST.
exports.participant_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: participant update POST');
};