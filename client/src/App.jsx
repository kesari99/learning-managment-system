import { Route, Routes } from "react-router-dom";
import Authpage from "./pages/auth";
import RouteGaurd from "./route-gaurd";
import { useContext } from "react";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import { AuthContext } from "./context/auth-context";
import NotFound from "./pages/not-found";
import InstructorDashboardPage from "./pages/instructor";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursePage from "./pages/student/courses";


export default function App() {
  const { auth } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/auth" element={<RouteGaurd element={<Authpage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path='/instructor' element={<RouteGaurd element={<InstructorDashboardPage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path='/instructor/create-new-course' element={<RouteGaurd element={<AddNewCoursePage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      <Route path='/instructor/edit-course/:courseId' element={<RouteGaurd element={<AddNewCoursePage />} authenticated={auth?.authenticate} user={auth?.user} />} />
      
      <Route
        path="/"
        element={
          <RouteGaurd
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursePage />} />
       
        
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}