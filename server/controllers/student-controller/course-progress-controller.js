

//mark current lecture is viewed
import {StudentCourses} from "../../models/StudentCourses.js";
import {CourseProgress} from "../../models/CourseProgress.js";
import {Course} from "../../models/Course.js";

export const markCurrentLectureAsViewed = async (req , res) => {
    try{

        const {userId, courseId, lectureId} = req.body

        let progress = await CourseProgress.findOne({userId, courseId})

        if(!progress){
            progress = new CourseProgress({
                userId,
                courseId,
                lectureId,
                lecturesProgress: [
                    {
                    lectureId,
                    viewed :true,
                    dateViewed:new Date()
                    }

                ]

            })
            await progress.save()


        }
        else{
            const lecturesProgress = progress.lecturesProgress.find(item => item.lectureId == lectureId)

            if(lecturesProgress){
                lecturesProgress.viewed = true
                lecturesProgress.dateViewed = new Date()


            }
            else{
                progress.lecturesProgress.push({
                    lectureId,
                    viewed :true,
                    dateViewed : new Date()
                })
            }
            await progress.save()

        }

        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }

        //check all the lectures are viewed
        const allLecturesViewd = progress.lecturesProgress.length ===
            course.curiculum.length && progress.lecturesProgress.every(item=> item.viewed)

        if(allLecturesViewd){
            progress.completed = true
            progress.completionDate = new Date()

            await progress.save()
        }

        res.status(200).json({
            success: true,
            message: "Lectured Marked as viewed",
            data:progress
        })



    }catch(err){
        res.status(404).json({
            success:false,
            message:'Some error occurred'
        })
    }
}


//get current course progress
export const getCurrentCourseProgress = async (req, res) => {
    try{

        const {userId, courseId} = req.params
        console.log(courseId, "courseId")

        const studentPurchasedCourses = await StudentCourses.findOne({userId})

        const isCurrentCoursePurchaseByCurrentUserOrNot = studentPurchasedCourses
            ?.courses
            ?.findIndex(item => item.courseId === courseId) > -1

        if(!isCurrentCoursePurchaseByCurrentUserOrNot){
            return res.status(200).json({
                success:true,
                data:{
                    isPurchased: false,


                },
                message:'You need to puchase this course to access it',


            })

        }

        const currentUserCourseProgress = await CourseProgress
            .findOne({userId, courseId})


        if( !currentUserCourseProgress || currentUserCourseProgress?.lecturesProgress.length === 0){
            const course = await Course.findById(courseId)

            if(!course){
                res.status(404).json({
                    success:false,
                    message:'Course does not exist'
                })
            }

            return res.status(200).json({
                success:true,
                message:'No Progress found you can start watching the course',
                data:{
                    courseDetails:course,
                    progress:[],
                    isPurchased:true,

                }

            })

        }

        const courseDetails = await Course.findById(courseId)


        res.status(200).json({
            success:true,
            data:{
                courseDetails,
                progress:currentUserCourseProgress.lecturesProgress,
                completed:currentUserCourseProgress.completed,
                completionDate:currentUserCourseProgress.completionDate,
                isPurchased:true

            }



        })






    }catch(err){
        console.log(err)
        res.status(404).json({

            success:false,
            message:'Some error occurred'
        })
    }
}


//reset course progresss
export const resetCurrentCourseProgress = async (req, res) => {
    try{

        const {userId, courseId} = req.body

        const progress = await CourseProgress.findOne({userId, courseId})

        if(!progress){
            return res.status(404).json({
                success:false,
                message:'Progress not found.'
            })
        }

        progress.lecturesProgress = []
        progress.completed = false
        progress.completionDate = null
        await progress.save()

        res.status(200).json({
            success:true,
            message:'Course progress has been reset',
            data:progress
        })


    }catch(err){
        res.status(404).json({
            success:false,
            message:'Some error occurred'
        })
    }
}