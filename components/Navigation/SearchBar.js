import React from 'react'
import { FaSearch, FaCog, FaBell } from 'react-icons/fa'

const SearchBar = () => {
  return (
    <div className="flex items-center p-3 bg-gray-100 border-b border-gray-300">
      <FaSearch className="text-xl mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <div className="flex items-center ml-2">
        <button className="p-2">
          <FaCog />
        </button>
        <button className="p-2 ml-2">
          <FaBell />
        </button>
      </div>
    </div>
  )
}

export default SearchBar