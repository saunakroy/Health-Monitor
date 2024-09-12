import React, { useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaCog, FaBell } from 'react-icons/fa'

const Home = () => {
  const [textInput, setTextInput] = useState('') // State variable for text input
  const [output, setOutput] = useState('') // State variable for output
  const [error, setError] = useState('')

  const handleTextChange = (e) => {
    setTextInput(e.target.value)
  }

  
  const handleTextSubmit = async () => {
  setError('')
  setOutput('')
  try {
    console.log('Sending request to /api/diagnose')
    const response = await fetch('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: textInput }),
    })

    console.log('Response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Received data:', data)
    setOutput(data.output)
  } catch (err) {
    console.error('Error:', err)
    setError(`Error: ${err.message}`)
  }
}

  // Split the output into an array of lines
  const outputLines = output.split('\n')

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
      <div className="main-container flex p-5">
        <div className="flex-1 p-5 h-full">
          <div className="mb-5">
            <h3 className="text-lg mb-2">Text Input</h3>
            <textarea
              placeholder="Type your text here..."
              value={textInput}
              onChange={handleTextChange}
              className="w-full h-80 p-2 border border-gray-300 rounded"></textarea>
            <button
              onClick={handleTextSubmit}
              className="w-full p-2 mt-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </div>
        <div className="flex-1 p-5 h-full">
        <div className="mb-5">
          <h3 className="text-lg mb-2">Output</h3>
          <div className="w-full min-h-80 h-fit border border-gray-300 rounded p-4 bg-gray-100">
            <div className="chat-output bg-white p-4 rounded-lg shadow-md">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                outputLines.map((line, index) => (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Home
