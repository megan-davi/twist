var express = require('express');
var router = express.Router();

// Require controller modules.
var highSchoolController = require('../controllers/highSchoolController');
var participantController = require('../controllers/participantController');
var presenterController = require('../controllers/presenterController');
var roomController = require('../controllers/roomController');
var scheduleController = require('../controllers/scheduleController');
var sessionController = require('../controllers/sessionController');
var topicController = require('../controllers/topicController');

/// HIGH SCHOOL ROUTES ///

// GET twist home page.
router.get('/', highSchoolController.index);

// GET request for creating a high school.
router.get('/highSchool/create', highSchoolController.highSchoolCreateGet);

// POST request for creating high school.
router.post('/highSchool/create', highSchoolController.highSchoolCreatePost);

// GET request to delete high school.
router.get('/highSchool/:id/delete', highSchoolController.highSchoolDeleteGet);

// POST request to delete high school.
router.post('/highSchool/:id/delete', highSchoolController.highSchoolDeletePost);

// GET request to update high school.
router.get('/highSchool/:id/update', highSchoolController.highSchoolUpdateGet);

// POST request to update high school.
router.post('/highSchool/:id/update', highSchoolController.highSchoolUpdatePost);

// GET request for one high school.
router.get('/highSchool/:id', highSchoolController.highSchoolDetail);

// GET request for list of all high schools.
router.get('/highSchool', highSchoolController.highSchoolList);

/// PARTICIPANT ROUTES ///

// GET request for creating a participant.
router.get('/participant/create', participantController.participantCreateGet);

// POST request for creating participant.
router.post('/participant/create', participantController.participantCreatePost);

// GET request to delete participant.
router.get('/participant/:id/delete', participantController.participantDeleteGet);

// POST request to delete participant.
router.post('/participant/:id/delete', participantController.participantDeletePost);

// GET request to update participant.
router.get('/participant/:id/update', participantController.participantUpdateGet);

// POST request to update participant.
router.post('/participant/:id/update', participantController.participantUpdatePost);

// GET request for one participant.
router.get('/participant/:id', participantController.participantDetail);

// GET request for list of all participants.
router.get('/participant', participantController.participantList);

/// PRESENTER ROUTES ///

// GET request for creating a presenter.
router.get('/presenter/create', presenterController.presenterCreateGet);

// POST request for creating presenter.
router.post('/presenter/create', presenterController.presenterCreatePost);

// GET request to delete presenter.
router.get('/presenter/:id/delete', presenterController.presenterDeleteGet);

// POST request to delete presenter.
router.post('/presenter/:id/delete', presenterController.presenterDeletePost);

// GET request to update presenter.
router.get('/presenter/:id/update', presenterController.presenterUpdateGet);

// POST request to update presenter.
router.post('/presenter/:id/update', presenterController.presenterUpdatePost);

// GET request for one presenter.
router.get('/presenter/:id', presenterController.presenterDetail);

// GET request for list of all presenter.
router.get('/presenter', presenterController.presenterList);

/// ROOM ROUTES ///

// GET request for creating a room.
router.get('/room/create', roomController.roomCreateGet);

//POST request for creating room.
router.post('/room/create', roomController.roomCreatePost);

// GET request to delete room.
router.get('/room/:id/delete', roomController.roomDeleteGet);

// POST request to delete room.
router.post('/room/:id/delete', roomController.roomDeletePost);

// GET request to update room.
router.get('/room/:id/update', roomController.roomUpdateGet);

// POST request to update room.
router.post('/room/:id/update', roomController.roomUpdatePost);

// GET request for one room.
router.get('/room/:id', roomController.roomDetail);

// GET request for list of all rooms.
router.get('/room', roomController.roomList);

/// SCHEDULE ROUTES ///

// GET request for creating a schedule.
router.get('/schedule/create', scheduleController.scheduleCreateGet);

//POST request for creating schedule.
router.post('/schedule/create', scheduleController.scheduleCreatePost);

// GET request to delete schedule.
router.get('/schedule/:id/delete', scheduleController.scheduleDeleteGet);

// POST request to delete schedule.
router.post('/schedule/:id/delete', scheduleController.scheduleDeletePost);

// GET request to update schedule.
router.get('/schedule/:id/update', scheduleController.scheduleUpdateGet);

// POST request to update schedule.
router.post('/schedule/:id/update', scheduleController.scheduleUpdatePost);

// GET request for one schedule.
router.get('/schedule/:id', scheduleController.scheduleDetail);

// GET request for list of all schedules.
router.get('/schedule', scheduleController.scheduleList);

/// SESSION ROUTES ///

// GET request for creating a session.
router.get('/session/create', sessionController.sessionCreateGet);

//POST request for creating session.
router.post('/session/create', sessionController.sessionCreatePost);

// GET request to delete session.
router.get('/session/:id/delete', sessionController.sessionDeleteGet);

// POST request to delete session.
router.post('/session/:id/delete', sessionController.sessionDeletePost);

// GET request to update session.
router.get('/session/:id/update', sessionController.sessionUpdateGet);

// POST request to update session.
router.post('/session/:id/update', sessionController.sessionUpdatePost);

// GET request for list of all sessions.
router.get('/session', sessionController.sessionList);

/// TOPIC ROUTES ///

// GET request for creating a topic.
router.get('/topic/create', topicController.topicCreateGet);

//POST request for creating topic.
router.post('/topic/create', topicController.topicCreatePost);

// GET request to delete topic.
router.get('/topic/:id/delete', topicController.topicDeleteGet);

// POST request to delete topic.
router.post('/topic/:id/delete', topicController.topicDeletePost);

// GET request to update topic.
router.get('/topic/:id/update', topicController.topicUpdateGet);

// POST request to update topic.
router.post('/topic/:id/update', topicController.topicUpdatePost);

// GET request for one topic.
router.get('/topic/:id', topicController.topicDetail);

// GET request for list of all topics.
router.get('/topic', topicController.topicList);

module.exports = router;
