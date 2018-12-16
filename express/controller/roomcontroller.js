var room = require('../models/room');


// Display list of all room.
exports.room_list = function(req, res) {
    res.send('NOT IMPLEMENTED: room list');
};

// Display detail page for a specific room.
exports.room_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: room detail: ' + req.params.id);
};

// Display room create form on GET.
exports.room_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: room create GET');
};

// Handle room create on POST.
exports.room_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: room create POST');
};

// Display room delete form on GET.
exports.room_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: room delete GET');
};

// Handle room delete on POST.
exports.room_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: room delete POST');
};

// Display room update form on GET.
exports.room_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: room update GET');
};

// Handle room update on POST.
exports.room_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: room update POST');
};