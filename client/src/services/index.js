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



export async function fetchStudentCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/get?${query}`)

  return data

}


export async function fetchStudentCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(`/student/get/details/${courseId}`)

  return data

}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(`/student/purchase-info/${courseId}/${studentId}`)

  return data

}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData)

  return data

}

export async function capturePaymentAndFinalizeService(paymentId, payerId, orderId) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  })

  return data

}

export async function fetchStudentBoughtCoursesServices(studentId) {
  const { data } = await axiosInstance.get(`/student/courses/get/${studentId}`)

  return data

}


export async function getCurrentCourseProgressService(studentId,courseId) {
  const { data } = await axiosInstance.get(`/student/course-progress/get/${studentId}/${courseId}`)

  return data

}

export async function markLectureAsViewedService(userId, courseId, lectureId){
  const {data} = await axiosInstance.post(`/student/course-progress/mark-lecture-viewed`,{
    userId, courseId,lectureId

  })

  return data
}

export async function resetCourseProgressService(userId, courseId){
  const {data} = await axiosInstance.post(`/student/course-progress/reset-progress`,{
    userId, courseId,
  })

  return data
}
