import express from 'express';
import {
    checkCoursePurchaseInfo,
    getAllStudentViewCourses,
    getStudentViewCourseDetails
} from '../../controllers/student-controller/course-controller.js';

const router = express.Router();


router.get('/get', getAllStudentViewCourses)
router.get('/get/details/:id',getStudentViewCourseDetails)
router.get('/purchase-info/:id/:studentId',checkCoursePurchaseInfo)


export default router;