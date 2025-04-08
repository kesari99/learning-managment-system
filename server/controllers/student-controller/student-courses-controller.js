import {StudentCourses} from "../../models/StudentCourses.js";


export const getCoursesByStudentID = async (req, res) => {

    try{
        const {studentId} = req.params


        const studentBoughtCourses = await StudentCourses.findOne({
            userId: studentId
        })
        res.status(200).json({
            success: true,
            data: studentBoughtCourses.courses,
        })



    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Error while getting courses'
        })
    }


}