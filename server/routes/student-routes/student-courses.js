import express from 'express';
import {getCoursesByStudentID} from "../../controllers/student-controller/student-courses-controller.js";


const router = express.Router()

router.get('/get/:studentId', getCoursesByStudentID)

export default router;