import { Course } from "../../models/Course.js"
import {StudentCourses} from "../../models/StudentCourses.js";

export const getAllStudentViewCourses = async (req, res) => {
    try{
        const {
            category=[],
            level=[],
            primaryLanguage=[],
            sortBy = 'price-lowtohigh'} = req.query

        let filters = {}
        if (category.length > 0) {
            filters.category = {$in: category.split(',')}
        }
        if (level.length > 0) {
            filters.level = {$in: level.split(',')}
        }
        if (primaryLanguage.length > 0) {
            filters.primaryLanguage = {$in: primaryLanguage.split(',')}
        }

        let sortParam = {}

        switch (sortBy) {
            case 'price-lowtohigh':
                sortParam.pricing = 1

                break;
            case 'price-hightolow':
                sortParam.pricing = -1

                break;
            case 'title-atoz':
                sortParam.title = 1

                break;
            case 'title-ztoa':
                sortParam.title = -1

                break;
            default:
                break;


        }






        const coursesList = await Course.find(filters).sort(sortParam)



        res.status(200).json({
            success: true,
            data:coursesList,
            message: "Courses found successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const getStudentViewCourseDetails = async (req, res) => {
    try{

        const {id} = req.params

        const courseDetails = await Course.findById(id)

        if(!courseDetails){
            res.status(400).json({
                success:false,
                data:[],
                message: "No courses details found"
            })

        }




        res.status(200).json({
            success: true,
            data:courseDetails,
            message: "Courses details found successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })



    }
}


export const checkCoursePurchaseInfo = async (req, res) => {
    try{
        const {id, studentId} = req.params

        const studentCourses = await StudentCourses.findOne({
            userId: studentId
        })

        const ifStudentAlreadyBoughtCurrentCourse = studentCourses.courses.findIndex(item => item.courseId === id) > -1

        res.status(200).json({
            success: true,
            data:ifStudentAlreadyBoughtCurrentCourse,

        })




    }catch(error){
        console.log(error)
    }
}