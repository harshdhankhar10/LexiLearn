import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MainDashboard from './MainDashboard'
import { useNavigate } from 'react-router-dom'
const DashPage = () => {
    const naviagte = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem("userInfo")){
            naviagte("/login")
        }
    }, [])


  return (
    <>
   <div className='flex h-screen bg-gray-100'>
    <div >
        <Sidebar/>
    </div>
     <div className="flex-1 p-8 overflow-y-auto">
        <MainDashboard/>
     </div>
   </div>
    </>
  )
}

export default DashPage