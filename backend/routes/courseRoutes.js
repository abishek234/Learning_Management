const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Route definitions
router.get('/', cacheMiddleware, courseController.getAllCourses);
router.get('/:id',cacheMiddleware,  courseController.getCourseById);
router.post('/', cacheMiddleware, courseController.createCourse);
router.put('/:id',cacheMiddleware,  courseController.updateCourse);
router.delete('/:id',cacheMiddleware,  courseController.deleteCourse);
router.get('/instructor/:id',cacheMiddleware,  courseController.getCoursesByInstructorId);
router.get('/instructor/count/:id',cacheMiddleware,  courseController.countCoursesByInstructorId);
router.get('/question/courses/:courseId',cacheMiddleware,  courseController.getAllQuestionsForCourse);


module.exports = router;