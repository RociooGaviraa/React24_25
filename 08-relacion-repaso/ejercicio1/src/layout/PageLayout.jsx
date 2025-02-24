import React from 'react'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <>
    <div>RootLayout</div>
    <Outlet/>
    </>
  )
}

export default PageLayout