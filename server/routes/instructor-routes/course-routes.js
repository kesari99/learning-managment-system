import express from 'express';
import { addNewCourse, getAllCourseDetails, getCourseDetailsById, updateCourseById } from "../../controllers/instructor-controller/course-controller.js";

const router = express.Router();

router.post('/add', addNewCourse)
router.get('/get', getAllCourseDetails)
router.get('/get/details/:id', getCourseDetailsById)
router.put('/update/:id', updateCourseById)


export default router