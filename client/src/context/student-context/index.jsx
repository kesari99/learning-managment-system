import { createContext, useState } from "react";



export const StudentContext = createContext(null)


export default function StudentProvider({children}){

    const [studentViewCoursesList, setStudentViewCoursesList] = useState([])
    const [loading, setLoading] = useState(true);
    const [studentViewCourseList, setStudentViewCourseList] = useState(null)
    const [currentCourseDetailsID, setCurrentCourseDetailsID] = useState(null)
    const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([])
    const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] = useState({})


    return (
        <StudentContext.Provider value={{
            studentViewCoursesList,
            setStudentViewCoursesList,
            loading,
            setLoading,
            studentViewCourseList,
            setStudentViewCourseList,
            currentCourseDetailsID,
            setCurrentCourseDetailsID,
            studentBoughtCoursesList,
            setStudentBoughtCoursesList,
            studentCurrentCourseProgress,
            setStudentCurrentCourseProgress

        }}>
            {children}
        </StudentContext.Provider>
    )
}