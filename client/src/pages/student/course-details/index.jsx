import {useContext, useEffect, useState} from "react";
import {StudentContext} from "@/context/student-context/index.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
        checkCoursePurchaseInfoService,
        createPaymentService,
        fetchStudentCourseDetailsService
} from "@/services/index.js";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {CheckCircleIcon, Globe, Lock, PlayCircleIcon} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import VideoPlayer from "@/components/viedo-player/index.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {AuthContext} from "@/context/auth-context/index.jsx";


function StudentViewCourseDetailsPage() {

        const navigate = useNavigate();
        const {
                studentViewCourseList: studentViewCourseDetails,
                setStudentViewCourseList,
                currentCourseDetailsID,
                setCurrentCourseDetailsID,
                loading,
                setLoading,
        } = useContext(StudentContext)

        const {auth} = useContext(AuthContext)

        const {id} = useParams()

        const location = useLocation()

        const [displayCurrentVideoFreePreview , setDisplayCurrentVideoFreePreview] = useState(null)
        const [showFreePreviewDialog , setShowFreePreviewDialog] = useState(false)
        const [approvalUrl, setApprovalUrl] = useState('')
        const [isCoursePurchased, setIsCoursePurchased] = useState(false)
        async function fetchStudentCourseDetails(){
                const response = await fetchStudentCourseDetailsService(id, auth?.user?._id)
                console.log(response.data)

                if(response?.success){
                        setStudentViewCourseList(response?.data)

                        setLoading(false)
                }else{
                        setStudentViewCourseList(null)
                        setLoading(false)

                }

        }

        function handleSetFreePreview(getCurrentVideoInfo){
                setDisplayCurrentVideoFreePreview((getCurrentVideoInfo?.videoUrl))
        }

        async function handleCreatePayment(){
                const paymentPaylod = {

                        userId:auth?.user?._id,
                        userName:auth?.user?.username,
                        userEmail:auth?.user?.userEmail,
                        orderStatus: 'pending',
                        paymentMethod:'paypal',
                        paymentStatus:'initiated',
                        orderDate: new Date(),
                        paymentId: '',
                        payerId : '',
                        instructorId : studentViewCourseDetails?.instructorId,
                        instructorName : studentViewCourseDetails?.instructorName,
                        courseImage: studentViewCourseDetails?.image,
                        courseTitle : studentViewCourseDetails?.title,
                        courseId: studentViewCourseDetails?._id,
                        coursePricing: studentViewCourseDetails?.pricing,

                }


                const response = await createPaymentService(paymentPaylod)
                if(response?.success){
                        sessionStorage.setItem('currentOrderId', JSON.stringify(response?.data?.orderId) )
                        setApprovalUrl(response?.data?.approveUrl)
                }

        }


        useEffect(() => {

                async function checkIfCourseisPurchasedOrNot(){
                        const response = await checkCoursePurchaseInfoService(id, auth?.user?._id)
                        if(response?.success){
                                if(response?.data){
                                        setIsCoursePurchased(response?.data)
                                }
                        }
                }

                checkIfCourseisPurchasedOrNot()

        }, [])

        console.log(isCoursePurchased, "isCoursePurchased")



        useEffect(() => {
                if(displayCurrentVideoFreePreview !== null){
                        setShowFreePreviewDialog(true)

                }

        }, [displayCurrentVideoFreePreview])


        useEffect(() => {
                if(currentCourseDetailsID !== null){
                        fetchStudentCourseDetails(currentCourseDetailsID)
                }

        }, [currentCourseDetailsID])


        useEffect(() => {
                if(id) setCurrentCourseDetailsID(id)

        },[id])

        useEffect(() => {
                if(!location.pathname.includes("/course/details")){
                        setCurrentCourseDetailsID(null)
                        setStudentViewCourseList(null)



                }

        }, [location.pathname]);

        if (loading) return <Skeleton />

        if(isCoursePurchased){
                navigate(`/course-progress/${id}`)
                return

        }



        if(approvalUrl !== ""){
                window.location.href = approvalUrl
        }


        // const getIndexOfFreePreview = studentViewCourseList !== null
        //     ? studentViewCourseList?.curiculum?.map((item, index) => item.freePreview ? index : -1).filter(index => index !== -1)
        //     : -1



        const getIndexOfFreePreview = studentViewCourseDetails !== null
        ? studentViewCourseDetails?.curiculum?.findIndex(item => item.freePreview)
            : -1

        console.log(getIndexOfFreePreview, studentViewCourseDetails?.curiculum[getIndexOfFreePreview], "freePreview index list")

        return <div className=" mx-auto p-4">
                <div className="bg-gray-900 text-white p-8 rounded-t-lg">
                        <h1 className="text-3xl font-bold mb-4">{studentViewCourseDetails?.title}</h1>
                        <p className="text-xl mb-4 " >{studentViewCourseDetails?.subtitle}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span>Created By {studentViewCourseDetails?.instructorName}</span>
                                <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
                                <span className="flex items-center">
                                        <Globe className="mr-1 h-4 w-4" />
                                        {studentViewCourseDetails?.primaryLanguage}

                                </span>

                                <span>{studentViewCourseDetails?.students.length} {studentViewCourseDetails?.students.length <=1 ? "Student" : "Students"}</span>
                        </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mt-8">
                        <main className="flex-grow">
                                <Card className="mb-8">
                                        <CardHeader>
                                                <CardTitle>What you will learn</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {
                                                                studentViewCourseDetails?.objectives.split(',').map(((objective, index     )=>(
                                                                        <li key={index} className="flex items-start">
                                                                                <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                                                                                <span>{objective}</span>
                                                                        </li>
                                                                )))
                                                        }
                                                </ul>
                                        </CardContent>

                                </Card>

                                <Card className="mb-8">
                                        <CardHeader>
                                                <CardTitle> Course Description</CardTitle>

                                        </CardHeader>
                                        <CardContent>
                                                {studentViewCourseDetails?.description}
                                        </CardContent>


                                </Card>



                                <Card className="mb-8">
                                        <CardHeader>
                                                Course Curriculum
                                        </CardHeader>


                                        <CardContent>
                                                {
                                                        studentViewCourseDetails?.curiculum.map((curiculumItem, index) => (
                                                            <li
                                                                key={index}
                                                                className={`${curiculumItem.freePreview ? 'cursor-pointer' : 'cursor-not-allowed'} flex items-center mb-4`}
                                                                onClick = {
                                                                    curiculumItem?.freePreview
                                                                    ? () => handleSetFreePreview(curiculumItem)
                                                                        :null
                                                            }
                                                            >
                                                                    {
                                                                            curiculumItem?.freePreview
                                                                        ? <PlayCircleIcon className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                                                                                : <Lock className="mr-2 h-4 w-4" />
                                                                    }
                                                                    <span>{curiculumItem?.title}</span>
                                                            </li>
                                                        ))
                                                }
                                        </CardContent>
                                </Card>



                        </main>

                        <aside className="w-full md:w-[500px]">
                        <Card className="sticky top-4">
                                <CardContent className="p-6">
                                        <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">

                                        <VideoPlayer
                                            url = {
                                                getIndexOfFreePreview !== -1  ?
                                                    studentViewCourseDetails?.curiculum[getIndexOfFreePreview].videoUrl : ''
                                            }
                                            width="450px"
                                            height="450px"


                                        />
                                        </div>

                                        <div className="mb-4">
                                                <span className="text-3xl font-bold">Rs. {studentViewCourseDetails?.pricing}</span>

                                        </div>

                                        <Button
                                            onClick={handleCreatePayment}
                                            className="w-full">
                                                Buy Now
                                        </Button>

                                </CardContent>

                        </Card>

                        </aside>

                </div>

                <Dialog
                    open={showFreePreviewDialog}
                    onOpenChange={() => {
                            setShowFreePreviewDialog(false);
                            setDisplayCurrentVideoFreePreview(null)
                    }}
                >
                        <DialogContent className="w-[800px]">
                                <DialogHeader>
                                        <DialogTitle>Course Preview</DialogTitle>
                                </DialogHeader>
                                <div className="aspect-video rounded-lg flex items-center justify-center">
                                        <VideoPlayer
                                            url={displayCurrentVideoFreePreview}
                                            width="450px"
                                            height="200px"
                                        />
                                </div>
                                <div className="flex flex-col gap-2">
                                        {studentViewCourseDetails?.curiculum
                                            ?.filter((item) => item.freePreview)
                                            .map((filteredItem, index) => (
                                                <p
                                                    key = {index}
                                                    onClick={() => handleSetFreePreview(filteredItem)}
                                                    className="cursor-pointer text-[16px] font-medium"
                                                >
                                                        {filteredItem?.title}
                                                </p>
                                            ))}
                                </div>
                                <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                        Close
                                                </Button>
                                        </DialogClose>
                                </DialogFooter>
                        </DialogContent>
                </Dialog>

        </div>
}

export default StudentViewCourseDetailsPage;