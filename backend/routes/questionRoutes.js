const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route definitions
router.post('/', questionController.addQuestion);
router.get('/:courseId', questionController.getAllQuestionsForCourse);
router.put('/:id',questionController.updateQuestion);
router.delete('/:id',questionController.deleteQuestion);
router.get('/question/data',questionController.getAllQuestions);
router.get('/question/:id',questionController.getQuestionById);
router.get('/instructor/question/:id',questionController.getQuestionsByInstructor);

module.exports = router;