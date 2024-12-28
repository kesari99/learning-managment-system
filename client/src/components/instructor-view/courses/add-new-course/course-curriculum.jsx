import MediaProgressBar from '@/components/media-progress-bar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import VideoPlayer from '@/components/viedo-player'
import { InstructorContext } from '@/context/instructor-context'
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from '@/services'
import { Upload } from 'lucide-react'
import React, { useContext, useRef } from 'react'

const CourseCurriculum = () => {
  const {courseCurriculumFormData,
        setCourseCurriculumFormData,
        handleNewLecture,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage
        } = useContext(InstructorContext)

    const bulkUploadInputRef = useRef(null)


  
  // function handleCourseTitleChange(event, currentIndex) {
  //     let copyCourseCurriculumFormData = [...courseCurriculumFormData]
  //     console.log(copyCourseCurriculumFormData)
  //     copyCourseCurriculumFormData[currentIndex] = {
  //       ...copyCourseCurriculumFormData[currentIndex],
  //       title: event.target.value
  //     }

  //     setCourseCurriculumFormData(copyCourseCurriculumFormData)

  //     console.log('copyCourseCurriculumFormData', copyCourseCurriculumFormData)
  // }

  // function hnadleFreePreviewChange(currentValue, currentIndex) {
  //   console.log(currentValue)

  // }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0]

    if(selectedFile){
      const viedoFormData  = new FormData()
      viedoFormData.append('file', selectedFile)
    

    try{
      setMediaUploadProgress(true)
      const response = await mediaUploadService(viedoFormData, setMediaUploadProgressPercentage)
      if(response.success){
          let copyCourseCurriculumFormData = [...courseCurriculumFormData]
          copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            videoUrl:response?.data?.url ,
            public_id: response?.data?.public_id
          }

          setCourseCurriculumFormData(copyCourseCurriculumFormData)
          setMediaUploadProgress(false)

      }


    }catch(error){
      console.log(error)

    }
    }

  }

  function isCourseCurriculumFormDataValid(){
    return courseCurriculumFormData.every((item) => {
      return (item && 
        typeof item === "object" && 
        item.title.trim() !== "" && 
        item.videoUrl.trim() !== ""
      )
    })
  }

  async function handleReplace(index) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData]
    const getCurriculumVideoPublicId = copyCourseCurriculumFormData[index]?.public_id

    const deleteCurrentMediaResponse = await mediaDeleteService(getCurriculumVideoPublicId)
    if(deleteCurrentMediaResponse.success){
      copyCourseCurriculumFormData[index] = {
        ...copyCourseCurriculumFormData[index],
        videoUrl: "",
        public_id: ""
      }
      
    }
    setCourseCurriculumFormData(copyCourseCurriculumFormData)

  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr){


    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === 'boolean'){
          return true
        }
        return value === ""
      })
    })


  }
  function handleOpenbulkUploadDialog() {
    bulkUploadInputRef.current?.click()
  }

  async function handleMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files)
    console.log(selectedFiles, 'selectedFiles')

  const bulkFormData = new FormData()

  selectedFiles.forEach(FileItem => bulkFormData.append('files', FileItem))

  for (const [key, value] of bulkFormData.entries()) {
    console.log(key, value);
  }
  try {
    setMediaUploadProgress(true)
    const response = await mediaBulkUploadService(bulkFormData, setMediaUploadProgressPercentage)
    console.log(response, 'bulk-response')

    if(response?.success){
      let copyCourseCurriculumFormData = areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
       ? [] : [...courseCurriculumFormData]

       copyCourseCurriculumFormData = [
        ...copyCourseCurriculumFormData,
        ...response.data.map((item, index) => ({
          videoUrl: item?.url,
          public_id : item?.public_id,
          title: `Lecture ${copyCourseCurriculumFormData.length + index + 1}`,
          freePreview: false
        }))
       ] 
       setCourseCurriculumFormData(copyCourseCurriculumFormData)
       setMediaUploadProgress(false)
    }
   


  } catch (error) {
    console.log(error)

  }

  }

  async function handleDeleteLecture(currentIndex){
    let copyCourseCurriculumFormData = [...courseCurriculumFormData]
   
    const getCurrentSelectedLecturePublicId = copyCourseCurriculumFormData[currentIndex].public_id;
    const response = await mediaDeleteService(getCurrentSelectedLecturePublicId)
    if (response.success){
      copyCourseCurriculumFormData = copyCourseCurriculumFormData.filter((item, index) => index !== currentIndex);
      setCourseCurriculumFormData(copyCourseCurriculumFormData)
    }
  }

 
  

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input 
            type = "file"
            ref = {bulkUploadInputRef}
            accept = "video/*"
            multiple
            className="hidden"
            id = "bulk-media-upload"
            onChange={handleMediaBulkUpload}
           />
           <Button
             as = 'label'
             htmlFor = "bulk-media-upload"
             variant="outline"
             className="cursor-pointer"
             onClick={handleOpenbulkUploadDialog}
           
           >
            <Upload 
              className="h-5 w-w mr-2" 
             
            />
            Bulk Upload
            
           </Button>
        </div>

      </CardHeader>
      <CardContent>
        <Button
            disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
            onClick = {handleNewLecture}
        >Add Lecture</Button>
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
       
        <div className='mt-4 space-y-4'>
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className='border p-5 rounded-md'>
              <div className='flex gap-5 items-center'>
                <h3 className='font-semibold'>Lecture {index + 1}</h3>
                <Input 
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  // onChange = {(event) => handleCourseTitleChange(event, index)}
                  onChange = {(event) => setCourseCurriculumFormData(courseCurriculumFormData.map((item, i) => i === index ? {...item, title :event.target.value} : item))}
                  value = {courseCurriculumFormData[index]?.title}
                
                />
                <div className="flex items-center space-x-2">
                  <Switch 
                  onCheckedChange= {(value) => setCourseCurriculumFormData(courseCurriculumFormData.map((item, i) => i === index ? {...item , freePreview : value} : item) )}
                  checked = {courseCurriculumFormData[index]?.freePreview}
                  id = {`freePreview-${index + 1}`}
                  
                  />
                  <Label htmlFor = {`freePreview-${index + 1}`}>Free Preview</Label>
                </div>
                
              </div>

              <div className='mt-6'>
                {
                  courseCurriculumFormData[index]?.videoUrl ? 
                  <div className='flex gap-3'>
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="450px"
                      height='250px'
                    
                    />
                    <Button onClick={() => handleReplace(index)}>Replace Video</Button>
                    <Button onClick={() => handleDeleteLecture(index)} className="bg-red-900">Delete Lecture</Button>

                  </div>
                  : 
                  <Input 
                  type="file"
                  accept ="viedo/*"
                  className="mb-4"
                  onChange = {(event) => handleSingleLectureUpload(event, index)}
                
                />
                }

               
              </div>



            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCurriculum