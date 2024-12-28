import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentViewCommonHeader from './header'

export default function StudentViewCommonLayout() {
  return (
    <div>
        <StudentViewCommonHeader />
        <Outlet />
    </div>
  )
}
