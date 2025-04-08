import {Button} from "@/components/ui/button.jsx";
import { Dialog,DialogTitle,DialogContent, DialogHeader, DialogDescription} from '@/components/ui/dialog.jsx'
import {Label} from '@/components/ui/label.jsx'
import {Tabs, TabsTrigger, TabsList,TabsContent} from '@/components/ui/tabs.jsx'

import {Check, ChevronLeft, ChevronRight, Play} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect,useState} from "react";
import {StudentContext} from "@/context/student-context/index.jsx";
import {AuthContext} from "@/context/auth-context/index.jsx";
import {
    getCurrentCourseProgressService,
    markLectureAsViewedService,
    resetCourseProgressService
} from "@/services/index.js";
import Confetii from 'react-confetti';
import VideoPlayer from "@/components/viedo-player/index.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";



function StudentViewCourseProgressPage(){

    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const {studentCurrentCourseProgress, setStudentCurrentCourseProgress} = useContext(StudentContext)
    const [lockCourse, setLockCourse] = useState(false)
    const [currentLecture, setCurrentLecture] = useState(null)
    const [showConfetti, setShowConfetti] = useState(false)
    const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const {id} = useParams()

    console.log(currentLecture)




    async function fetchCurrentCourseProgress(){
        console.log(auth?.user?._id, id, "check courseId")
        const resposne = await getCurrentCourseProgressService(auth?.user?._id, id)
        console.log(resposne)

        if(resposne?.success){
            if(!resposne?.data?.isPurchased){
                setLockCourse(true)

            }
            else{
                setStudentCurrentCourseProgress({
                    courseDetails: resposne?.data?.courseDetails,
                    progress:resposne?.data?.progress
                })
            }

            if(resposne?.data?.completed){
                console.log(resposne?.data?.completed,"completed")
                setCurrentLecture((resposne?.data?.courseDetails?.curiculum[0]))
                setShowCourseCompleteDialog(true)
                setShowConfetti(true)

                return
            }

            if(resposne?.data?.progress?.length === 0 ){
                console.log(resposne?.data?.courseDetails?.curiculum,"Lecture")

                setCurrentLecture(resposne?.data?.courseDetails?.curiculum[0])
            }
            else{
                //
                console.log("logging here")
                const lastIndexasViewedTrue = resposne?.data?.progress.reduceRight(
                    (acc, obj, index) => {
                        return acc === -1 && obj.viewed ? index : acc
                    },
                    -1

                )

                setCurrentLecture(
                    resposne?.data?.courseDetails?.curiculum[lastIndexasViewedTrue+1])
            }

        }
    }
    useEffect(() => {
        if (showConfetti) setTimeout(() => setShowConfetti(false), 8000)

    },[showConfetti])

    useEffect(()=>{
        fetchCurrentCourseProgress()

    }, [id])

    async function updateCourseProgress(){
        if(currentLecture){
            const response = await markLectureAsViewedService(
                auth?.user?._id,
                studentCurrentCourseProgress?.courseDetails?._id,
                currentLecture._id )
            if (response?.success){
                fetchCurrentCourseProgress()
            }

        }
    }

    useEffect(() => {
        if(currentLecture?.progressValue === 1) updateCourseProgress()

    }, [currentLecture]);

    async  function handleRewatchCourse(){
        const respose = await resetCourseProgressService(auth?.user?._id, studentCurrentCourseProgress?.courseDetails?._id)

        if(respose?.success){
            setCurrentLecture(null)
            setShowConfetti(false)
            setShowCourseCompleteDialog(false)
            fetchCurrentCourseProgress()
        }
    }


    return( <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
        {
            showConfetti && <Confetii />
        }
       <div className="flex item-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700 ">
           <div className="flex items-center space-x-4">
               <Button
                   onClick={()=>navigate('/student-courses')}
                   className="text-black bg-white" variant="ghost" size="sm">
                   <ChevronLeft className="h-4 w-4 mr-2" />
                   Back to Courses Page
               </Button>

           </div>


           <h1 className="text-lg font-bold hidden md:block">
               {
                   studentCurrentCourseProgress?.courseDetails?.title
               }
           </h1>
           <Button onClick ={() => setIsSidebarOpen(!isSidebarOpen)} >
               {
                   isSidebarOpen ? <ChevronRight className="h-5 w-5 mr-2" /> : <ChevronLeft className="h-5 w-5 mr-2" />
               }


           </Button>


       </div>

        <div className="flex flex-1 overflow-hidden">
            <div className={`flex-1 ${isSidebarOpen ? 'mr-[400px]' : ''} transition-all duration-200`}>
                <VideoPlayer
                    width="100%"
                    height="100%"
                    url = {currentLecture?.videoUrl}
                    onProgressUpdate={setCurrentLecture}
                    progressData={currentLecture}


                />
                <div className="p-6 bg-[#1c1d1f] text-white">
                    <h2 className="text-2xl font-bold">{currentLecture?.title}</h2>


                </div>

            </div>
            <div className={`fixed top-[68px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border border-l border-gray-700 transition-all duration-200 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} `}>
                <Tabs defaultValue="content" className="h-full flex flex-col ">
                    <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
                        <TabsTrigger value="content" className=" text-black rounded-none h-full">

                            Course Content
                        </TabsTrigger>
                        <TabsTrigger value="overview" className=" text-black rounded-none h-full">

                            Overview
                        </TabsTrigger>

                    </TabsList>
                    <TabsContent value="content">

                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-4">
                                {
                                    studentCurrentCourseProgress?.courseDetails?.curiculum?.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer">
                                            {
                                                studentCurrentCourseProgress?.progress?.find(progressItem => progressItem.lectureId === item._id)?.viewed ?
                                                    <Check className="h-4 w-4 text-green-500" />
                                                    : <Play className="h-4 w-4 text-green-500" />
                                            }
                                            <span>{item?.title}</span>

                                        </div>

                                        )
                                    )


                                }

                            </div>

                        </ScrollArea>




                    </TabsContent>

                    <TabsContent value="overview" className="flex-1 overflow-hidden ">
                        <ScrollArea className="h-full">
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-4">
                                    About this course

                                </h2>
                                <p className=" text-gray-400">
                                    {studentCurrentCourseProgress?.courseDetails?.description}
                                </p>

                            </div>


                        </ScrollArea>

                    </TabsContent>

                </Tabs>
            </div>


        </div>






        <Dialog open={lockCourse} >
            <DialogContent className="sm:w-[425px]">

                <DialogHeader>
                    <DialogTitle>
                        you can't view this page
                    </DialogTitle>
                    <DialogDescription>
                        please purchase this course to get access
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>

        <Dialog open={showCourseCompleteDialog}>
            <DialogContent className="sm:w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Congrulations!
                    </DialogTitle>
                    <DialogDescription className="flex flex-col gap-3">
                        <Label>You have completed the course</Label>
                        <div className="flex flex-col gap-3">
                            <Button onClick = {() => navigate('/student-courses')} >My Courses Page</Button>
                            <Button onClick = {handleRewatchCourse}>Re watch this course</Button>
                        </div>

                    </DialogDescription>
                </DialogHeader>

            </DialogContent>

        </Dialog>

    </div>)
}

export default StudentViewCourseProgressPage;