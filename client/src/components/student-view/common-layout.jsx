import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentViewCommonHeader from './header'

export default function StudentViewCommonLayout() {
  return (
    <div>
        {
            !location.pathname.includes('course-progress') ?
                <StudentViewCommonHeader /> : null


        }

        <Outlet />
    </div>
  )
}
