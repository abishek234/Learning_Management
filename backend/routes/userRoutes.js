const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/add-instructor', userController.addInstructor);
router.get('/instructors/data', userController.getAllInstructors);
router.post('/instructor/send-email', userController.sendEmail);
router.post('/send-otp',userController.sendotp);
router.post('/verify-otp',userController.verifyOtp)



module.exports = router;