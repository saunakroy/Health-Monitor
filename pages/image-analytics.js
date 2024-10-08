import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaCog, FaBell } from 'react-icons/fa'

const Home = () => {
  const [output, setOutput] = useState('') // State for output

  // Example function to format output with new lines
  const handleOutput = (text) => {
    const formattedText = text.replace(/\n/g, '\n'); // Preserve new lines
    setOutput(formattedText);
  }

  return (
    <>
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
      <div className="flex p-5">
        <div className="flex-1 p-5">
          <div>
            <h3 className="text-lg mb-2">Image Upload</h3>
            <input type="file" className="w-full" />
          </div>
        </div>
        <div className="flex-1 p-5">
          <div>
            <h3 className="text-lg mb-2">Output</h3>
            <div
              className="w-full h-40 border border-gray-300 rounded flex items-center justify-center bg-gray-100 p-4"
              style={{ whiteSpace: 'pre-line' }} // Preserve new lines
            >
              <div className="chat-output bg-white p-4 rounded-lg shadow-md">
                {output || "Output will be displayed here"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
