import { Course } from "../../models/Course.js";


export const addNewCourse = async (req, res) => {

    try{

        console.log(req.body)
        const courseData = req.body

    const newlyCreatedCourse = new Course(courseData)

    const saveCourse = await newlyCreatedCourse.save()

    if(saveCourse){

        return res.status(200).json({success: true, data: saveCourse, message: 'Course created successfully'})
    }

    }catch(error){
        console.log(error)
        res.status(400).json({success: false, message: 'Error adding course'})

    }
}



export const getAllCourseDetails = async (req, res) => {

    


    try{
        const coursesList = await Course.find({})

        return res.status(200).json({success: true, data: coursesList, message: 'Courses fetched successfully'})

    }catch(error){
        console.log(error)
        res.status(400).json({success: false, message: 'Error adding course'})

    }
}


export const getCourseDetailsById = async (req, res) => {

    


    try{
        const courseId = req.params.id

        const courseDetails = await Course.findById(courseId)

        if(!courseDetails){
            return res.status(404).json({success: false, message: 'Course not found'})
        }

        res.status(200).json({success: true, data: courseDetails, message: 'Course fetched successfully'})

    }catch(error){
        console.log(error)
        res.status(400).json({success: false, message: 'Error adding course'})

    }
}




    export const updateCourseById = async (req, res) => {


        try{
            const courseId = req.params.id
            const courseData = req.body

            const updateCourseDetails = await Course.findByIdAndUpdate(courseId, courseData, {new: true})

            if(!updateCourseDetails){
                return res.status(404).json({success: false, message: 'Course not found'})
            }

            res.status(200).json({success: true, data: updateCourseDetails, message: 'Course updated successfully'})
        


        }catch(error){
            console.log(error)
            res.status(400).json({success: false, message: 'Error adding course'})

        }
    }

