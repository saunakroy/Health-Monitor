import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaCog, FaBell } from 'react-icons/fa';

const Home = () => {
  const [textInput, setTextInput] = useState(''); // State variable to track the text input
  const [output, setOutput] = useState(''); // State variable to track the output

  const handleTextChange = (e) => {
    setTextInput(e.target.value); // Update state when text changes
  };

  const handleTextSubmit = async () => {
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: textInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.output); // Set the output to be displayed
      } else {
        console.error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
              className="w-full h-80 p-2 border border-gray-300 rounded"
            ></textarea>
            <button
              onClick={handleTextSubmit}
              className="w-full p-2 mt-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex-1 p-5 h-full">
          <div className="mb-5">
            <h3 className="text-lg mb-2">Output</h3>
            <div className="w-full h-80 border border-gray-300 rounded flex items-center justify-center bg-gray-100">
              {output || 'Output will be displayed here'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
