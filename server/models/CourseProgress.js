import mongoose from "mongoose";


const LectureProgress = new mongoose.Schema({
    lectureId:String,
    viewed:Boolean,
    dateViewed:Date,
})


const CourseProgressScheme = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    completionDate:Date,
    lecturesProgress:[LectureProgress]

})

export const CourseProgress = mongoose.model("CourseProgress", CourseProgressScheme)