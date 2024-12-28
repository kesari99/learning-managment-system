import axiosInstance from '@/api/axiosInstance.js';


export async function registerService(signUpFormData) {
  const { data } = await axiosInstance.post('/auth/register', {
    ...signUpFormData,
    role: 'user'
  })

  return data
}


export async function loginService(formData) {
  const { data } = await axiosInstance.post('/auth/login', {
    ...formData,

  })

  return data
}


export async function checkAuthService() {
  try {
    const { data } = await axiosInstance.get("/auth/check-auth");
    return data;
  } catch (err) {

    return { success: false, message: "Authentication failed" };
  }
}


export async function mediaUploadService(formData, onProgressCallback) {
  try {
    const { data } = await axiosInstance.post("/media/upload", formData, {
      onUploadProgress: (progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgressCallback(percentCompleted)
      })
    });
    return data;
  } catch (err) {

    return { success: false, message: "Authentication failed" };
  }
}


export async function mediaBulkUploadService(formData, onProgressCallback) {
  try {
    const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
      onUploadProgress: (progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgressCallback(percentCompleted)
      })
    });
    return data;
  } catch (err) {
    console.log(err)

    return { success: false, message: "Authentication failed" };
  }
}


export async function mediaDeleteService(id) {
  try {
    const { data } = await axiosInstance.delete(`/media/delete/${id}`);
    return data;
  } catch (err) {

    return { success: false, message: "Authentication failed" };
  }
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/get`)

  return data

}

export async function addNewCourseService(formData) {
  console.log(formData)

  const { data } = await axiosInstance.post(`/instructor/add`, formData)

  return data

}

export async function fetchInstructorCourseDetailsService(id) {

  const { data } = await axiosInstance.get(`/instructor/get/details/${id}`)

  return data

}
export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(`/instructor/update/${id}`, formData)

  return data


}



export async function fetchStudentCourseListService() {
  const { data } = await axiosInstance.get(`/student/get`)

  return data

}


export async function fetchStudentCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(`/student/details/get${courseId}`)

  return data

}