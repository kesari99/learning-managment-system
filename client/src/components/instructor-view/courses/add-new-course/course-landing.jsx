import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormControls from '@/components/ui/common-form/form-controls'
import { courseLandingInitialFormData, courseLandingPageFormControls } from '@/config'
import { InstructorContext } from '@/context/instructor-context'
import React, { useContext } from 'react'

const CourseLanding = () => {
  const {courseLandingFormData,
    setCourseLandingFormData} = useContext(InstructorContext)


  return (
   <Card>
    <CardHeader>
      <CardTitle>Course Landing Page</CardTitle>

      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData = {courseLandingFormData}
          setFormData = {setCourseLandingFormData}
        
        >

        </FormControls>

      </CardContent>
    </CardHeader>
   </Card>
  )
}

export default CourseLanding