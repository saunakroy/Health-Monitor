import React, { useState, useEffect } from 'react'

const Home = () => {
  const [textInput, setTextInput] = useState('') // State variable for text input
  const [output, setOutput] = useState('') // State variable for output
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // State variable for loading

  const handleTextChange = (e) => {
    setTextInput(e.target.value)
  }

  const handleTextSubmit = async () => {
    setError('')
    setOutput('')
    setLoading(true) // Set loading to true
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
    } finally {
      setLoading(false) // Set loading to false
    }
  }

  // Add event listener for keydown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleTextSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [textInput])

  // Split the output into an array of lines
  const outputLines = output.split('\n')

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-200 flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-4">Input</h2>
        <p className="mb-4 text-gray-600">
          Describe your symptoms, conditions, or any health concerns you have and press the submit button when you’re finished. You can also press CMD + ENTER (Mac) or CTRL + ENTER (Windows) to submit.
        </p>
        <textarea
          placeholder="Type your text here..."
          value={textInput}
          onChange={handleTextChange}
          className="w-full h-1/2 p-2 border border-gray-300 rounded-lg bg-white resize-none mb-4"
        ></textarea>
        <button 
          onClick={handleTextSubmit} 
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <div className="w-1/2 bg-gray-100 p-5">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        {loading ? (
          <div className="loading-animation">Loading...</div>
        ) : output ? (
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
        ) : null}
      </div>
    </div>
  )
}

export default Home
