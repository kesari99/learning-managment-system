import mongoose from "mongoose";


const studentCoursesScheme = new mongoose.Schema({
    userId:String,
    courses : [
        {
            courseId:String,
            title:String,
            instructor:String,
            instructorName:String,
            dateOfPurchase:String,
            courseImage:String
        }
    ]
})

export const  StudentCourses = mongoose.model("StudentCourses",studentCoursesScheme)

