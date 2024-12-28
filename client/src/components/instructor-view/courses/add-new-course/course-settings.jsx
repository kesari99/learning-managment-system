import MediaProgressBar from '@/components/media-progress-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InstructorContext } from '@/context/instructor-context'
import { mediaUploadService } from '@/services'
import React, { useContext } from 'react'

const CourseSetting = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage
  } = useContext(InstructorContext)


    const handleImageUploadChange = async (event) => {
      setMediaUploadProgress(true)
      const selectedImage = event.target.files[0]

      if(selectedImage){
        const imageFormData = new FormData()
        imageFormData.append('file', selectedImage)

        try{

          const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage)

          if(response){
            setMediaUploadProgress(false)
            setCourseLandingFormData({
              ...courseLandingFormData,
              image:response?.data?.url
            })
          }

        }catch(error){
          console.log(error)
        }


      }



    }

    console.log(courseLandingFormData)


  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>


      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-3'>
          <div className='p-4'>
          {
          mediaUploadProgress ? 
          <MediaProgressBar 
           isMediaUploading = {mediaUploadProgress}
           progress = {mediaUploadProgressPercentage}
          
          />
          : null
        }

          </div>
       
          <Label>Upload Course Image</Label>
          {
            courseLandingFormData.image ? <img
             src={courseLandingFormData.image}
             alt="course-landing-image"
            
            /> : 

            <Input  
            type='file' 
            accept='image/*'
            className='mb-4'
            onChange={handleImageUploadChange}
          />

          }
          


        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSetting