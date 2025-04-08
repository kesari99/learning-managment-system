import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle,CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Delete, Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { InstructorContext } from '@/context/instructor-context'
import { useContext } from 'react'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config'

function InstructorCourses({listOfCourses}) {
  
  const navigate = useNavigate()

  const {currentEditedCourseId, setCurrentEditedCourseId,setCourseLandingFormData,setCourseCurriculumFormData} = useContext(InstructorContext)

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold"> All Courses</CardTitle>
        <Button
            onClick = {() => {
                  setCurrentEditedCourseId(null)
                  setCourseLandingFormData(courseLandingInitialFormData)
                  setCourseCurriculumFormData(courseCurriculumInitialFormData)
                  navigate('/instructor/create-new-course')}}
            className="p-6">Create new course</Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Course</TableHead>
      <TableHead>Students</TableHead>
      <TableHead>Revenue</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>

    {
      listOfCourses.length > 0 ? listOfCourses.map((course) =><TableRow>
      <TableCell className="font-medium">{course?.title}</TableCell>
      <TableCell>{course?.students.length}</TableCell>
      <TableCell> {course?.pricing}</TableCell>
      <TableCell className="justify-end flex items-center">
        <Button onClick={() => {
            navigate(`/instructor/edit-course/${course?._id}`)
          }
        }  
        className=" md:mr-2" 
        size="sm" 
        variant="ghost">
          <Edit className='h-6 w-6' />  
        </Button>
        <Button  size="sm" variant="ghost">
          <Delete className='h-6 w-6' />  
        </Button>
      </TableCell>
    </TableRow> 
      
      ) : null
    }
    
  </TableBody>
</Table>


      </CardContent>
    </Card>
      
  )
}

export default InstructorCourses
