import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'

function Layout({children}) {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default Layout