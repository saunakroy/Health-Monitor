import React, { useState } from 'react'
import Link from 'next/link'

const Sidebar = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className="h-screen w-full flex fixed">
      <div className="sidebar h-screen w-84 flex bg-gray-900 text-white flex-col justify-between">
        <div className="p-5 border-y border-gray-300 bg-gray-200">
          <div className="flex items-center cursor-pointer text-2xl text-black" onClick={toggleDropdown}>
            <img src={'/favicon.ico'} alt="Profile Picture" className="w-10 h-10 rounded-full mr-2" />
            <span>James Timmy Turner</span>
            <div
              className={`absolute top-16 left-5 bg-white border border-gray-300 shadow-lg ${
                dropdownOpen ? 'flex' : 'hidden'
              } flex-col`}>
              <div className="p-2">
                <p>Profile</p>
                <p>Settings</p>
                <p>Help</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-grow flex flex-col text-center text-xl">
          <Link href="/" className="sidebar-items">
            Diagnose
          </Link>
          <Link href="/analytics" className="sidebar-items">
            Analytics
          </Link>
          <Link href="/image-analysis" className="sidebar-items">
            Image Analysis
          </Link>
          <Link href="/history" className="sidebar-items">
            History
          </Link>
        </nav>
        <div className="p-5 border-t border-gray-300">
          <button className="w-full py-2 bg-red-600 text-white hover:bg-red-700">Logout</button>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Sidebar
