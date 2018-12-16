var express = require('express');
var router = express.Router();

// Require controller modules.
var highschoolcontroller = require('../controllers/highschoolController');
var participantcontroller = require('../controllers/participantController');
var presentercontroller = require('../controllers/presenterController');
var roomcontroller = require('../controllers/roomController');
var schedulecontroller = require('../controllers/scheduleController');
var sessioncontroller = require('../controllers/sessionController');
var topiccontroller = require('../controllers/topicController');

/// HIGHSCHOOL ROUTES ///

// GET catalog home page.
router.get('/', highschoolcontroller.index);

// GET request 
router.get('/highschool/create', highschoolcontroller.highschool_create_get);

// POST request for creating highschool.
router.post('/highschool/create', highschoolcontroller.highschool_create_post);

// GET request to delete highschool.
router.get('/highschool/:id/delete', highschoolcontroller.highschool_delete_get);

// POST request to delete highschool.
router.post('/highschool/:id/delete', highschoolcontroller.highschool_delete_post);

// GET request to update highschool.
router.get('/highschool/:id/update', highschoolcontroller.highschool_update_get);

// POST request to update highschool.
router.post('/highschool/:id/update', highschoolcontroller.highschool_update_post);

// GET request for one highschool.
router.get('/highschool/:id', highschoolcontroller.highschool_detail);

// GET request for list of all highschool items.
router.get('/highschools', highschoolcontroller.highschool_list);


/// PARTICIPANT ROUTES ///

// GET request for creating participant. NOTE This must come before route for id (i.e. display participant).
router.get('/participant/create', participantcontroller.participant_create_get);

// POST request for creating participant.
router.post('/participant/create', participantcontroller.participant_create_post);

// GET request to delete participant.
router.get('/participant/:id/delete', participantcontroller.participant_delete_get);

// POST request to delete participant.
router.post('/participant/:id/delete', participantcontroller.participant_delete_post);

// GET request to update participant.
router.get('/participant/:id/update', participantcontroller.participant_update_get);

// POST request to update participant.
router.post('/participant/:id/update', participantcontroller.participant_update_post);

// GET request for one participant.
router.get('/participant/:id', participantcontroller.participant_detail);

// GET request for list of all participants.
router.get('/participants', participantcontroller.participant_list);


/// PRESENTER ROUTES ///

// GET request for creating a presenter. NOTE This must come before route that displays presenter (uses id).
router.get('/presenter/create', presentercontroller.presenter_create_get);

//POST request for creating presenter.
router.post('/presenter/create', presentercontroller.presenter_create_post);

// GET request to delete presenter.
router.get('/presenter/:id/delete', presentercontroller.presenter_delete_get);

// POST request to delete presenter.
router.post('/presenter/:id/delete', presentercontroller.presenter_delete_post);

// GET request to update presenter.
router.get('/presenter/:id/update', presentercontroller.presenter_update_get);

// POST request to update presenter.
router.post('/presenter/:id/update', presentercontroller.presenter_update_post);

// GET request for one presenter.
router.get('/presenter/:id', presentercontroller.presenter_detail);

// GET request for list of all presenter.
router.get('/presenters', presentercontroller.presenter_list);


/// ROOM ROUTES ///

// GET request for creating a room. NOTE This must come before route that displays room (uses id).
router.get('/room/create', roomcontroller.room_create_get);

// POST request for creating room. 
router.post('/room/create', roomcontroller.room_create_post);

// GET request to delete room.
router.get('/room/:id/delete', roomcontroller.room_delete_get);

// POST request to delete room.
router.post('/room/:id/delete', roomcontroller.room_delete_post);

// GET request to update room.
router.get('/room/:id/update', roomcontroller.room_update_get);

// POST request to update room.
router.post('/room/:id/update', roomcontroller.room_update_post);

// GET request for one room.
router.get('/room/:id', roomcontroller.room_detail);

// GET request for list of all room.
router.get('/rooms', roomcontroller.room_list);

module.exports = router;


/// SCHEDULE ROUTES ///

// GET catalog home page.
router.get('/', schedulecontroller.index);

// GET request 
router.get('/schedule/create', schedulecontroller.schedule_create_get);

// POST request for creating schedule.
router.post('/schedule/create', schedulecontroller.schedule_create_post);

// GET request to delete schedule.
router.get('/schedule/:id/delete', schedulecontroller.schedule_delete_get);

// POST request to delete schedule.
router.post('/schedule/:id/delete', schedulecontroller.schedule_delete_post);

// GET request to update schedule.
router.get('/schedule/:id/update', schedulecontroller.schedule_update_get);

// POST request to update schedule.
router.post('/schedule/:id/update', schedulecontroller.schedule_update_post);

// GET request for one schedule.
router.get('/schedule/:id', schedulecontroller.schedule_detail);

// GET request for list of all schedule items.
router.get('/schedules', schedulecontroller.schedule_list);


/// SESSION ROUTES ///

// GET request for creating participant. NOTE This must come before route for id (i.e. display participant).
router.get('/participant/create', participantcontroller.participant_create_get);

// POST request for creating participant.
router.post('/participant/create', participantcontroller.participant_create_post);

// GET request to delete participant.
router.get('/participant/:id/delete', participantcontroller.participant_delete_get);

// POST request to delete participant.
router.post('/participant/:id/delete', participantcontroller.participant_delete_post);

// GET request to update participant.
router.get('/participant/:id/update', participantcontroller.participant_update_get);

// POST request to update participant.
router.post('/participant/:id/update', participantcontroller.participant_update_post);

// GET request for one participant.
router.get('/participant/:id', participantcontroller.participant_detail);

// GET request for list of all participants.
router.get('/participants', participantcontroller.participant_list);


/// TOPIC ROUTES ///

// GET request for creating a presenter. NOTE This must come before route that displays presenter (uses id).
router.get('/presenter/create', presentercontroller.presenter_create_get);

//POST request for creating presenter.
router.post('/presenter/create', presentercontroller.presenter_create_post);

// GET request to delete presenter.
router.get('/presenter/:id/delete', presentercontroller.presenter_delete_get);

// POST request to delete presenter.
router.post('/presenter/:id/delete', presentercontroller.presenter_delete_post);

// GET request to update presenter.
router.get('/presenter/:id/update', presentercontroller.presenter_update_get);

// POST request to update presenter.
router.post('/presenter/:id/update', presentercontroller.presenter_update_post);

// GET request for one presenter.
router.get('/presenter/:id', presentercontroller.presenter_detail);

// GET request for list of all presenter.
router.get('/presenters', presentercontroller.presenter_list);