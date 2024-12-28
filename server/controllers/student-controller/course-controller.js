import { Course } from "../../models/Course.js"

export const getAllStudentViewCourses = async (req, res) => {
    try{
        const coursesList = await Course.find({})

        if(coursesList.length === 0){
            res.status(400).json({
                success:false,
                data:[],
                message: "No courses found"
            })
        }

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