import React, { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { MdKeyboardReturn, MdKeyboardCommandKey, MdKeyboardControlKey } from 'react-icons/md'
import { FaWindows, FaApple } from 'react-icons/fa'
import { marked } from 'marked'

const Home = () => {
  // React states that handle changing data on the page
  const [textInput, setTextInput] = useState('')
  const [output, setOutput] = useState('')
  const [animatedOutput, setAnimatedOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [autoScrolling, setAutoScrolling] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  // Ref to keep track of the output container for scrolling
  const outputRef = useRef(null)

  // Updates textInput state when user types in the input
  const handleTextChange = (e) => {
    setTextInput(e.target.value)
  }

  // Handles submission when user submits
  const handleTextSubmit = async () => {
    setError('')
    setOutput('')
    setLoading(true)
    setIsTyping(true)
    setAutoScrolling(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { 
              role: "system", 
              content: "You are a helpful medical assistant. Provide clear, informative responses about health concerns, but remind users to consult healthcare professionals for proper medical advice." 
            },
            { 
              role: "user", 
              content: textInput 
            }
          ]
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setOutput(data.reply)
      setAnimatedOutput(data.reply)
      setAutoScrolling(true)
    } catch (err) {
      console.error('Error:', err)
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleTypingComplete = () => {
    setIsTyping(false)
    setAutoScrolling(false)
  }

  const getMarkdownHTML = (markdown) => {
    return { __html: marked(markdown) }
  }

  // Calculate the speed based on the length of the output
  const calculateSpeed = (text) => {
    const length = text.length
    if (length > 1000) return 99
    if (length > 200) return 90
    return 80
  }

  // Calculate the speed based on the current output
  const typingSpeed = calculateSpeed(output)

  // Submit when user presses Cmd + Enter or Ctrl + Enter
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

  // Scroll to bottom during typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (outputRef.current && autoScrolling) {
        // Scroll to the bottom as the output grows
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    }, 100) // Scroll check every 100ms

    return () => clearInterval(interval)
  }, [output, autoScrolling])

  // Detect when user scrolls in the output area and disable auto-scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (autoScrolling && outputRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = outputRef.current
        // Check if user manually scrolls (not at the bottom)
        if (scrollTop + clientHeight < scrollHeight) {
          setAutoScrolling(false)
        }
      }
    }

    if (outputRef.current) {
      outputRef.current.addEventListener('scroll', handleScroll)
    }

    // Clean up the event listener
    return () => {
      if (outputRef.current) {
        outputRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [autoScrolling])

  return (
    <div className="flex h-screen">
      {/* Input container, left half of the screen */}
      <div className="w-1/2 bg-gray-200 flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-4">Input</h2>

        {/* Description for user info */}
        <p className="description mb-4 text-gray-600">
          Describe your symptoms, conditions, or any health concerns you have and press the submit
          button when you're finished. You can also press{' '}
          <kbd>
            <MdKeyboardCommandKey />
          </kbd>{' '}
          +{' '}
          <kbd>
            <MdKeyboardReturn />
          </kbd>{' '}
          (
          <span className="comp-os-icon">
            <FaApple />
          </span>
          ) or{' '}
          <kbd>
            <MdKeyboardControlKey />
          </kbd>{' '}
          +{' '}
          <kbd>
            <MdKeyboardReturn />
          </kbd>{' '}
          (
          <span className="comp-os-icon">
            <FaWindows />
          </span>
          ) to submit.
        </p>

        {/* The actual input area */}
        <textarea
          placeholder="Type your text here..."
          value={textInput}
          onChange={handleTextChange}
          className="w-full h-1/2 p-2 border border-gray-300 rounded-lg bg-white resize-none mb-4"></textarea>
        <button
          onClick={handleTextSubmit}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </div>

      {/* Right half of the page, output area */}
      <div className="w-1/2 bg-gray-100 p-5">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        {/* Displays loading animation when loading, error if error, otherwise the output */}
        {loading ? (
          <div className="typing-indicator flex items-center justify-center h-full">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : output ? (
          <div
            className="chat-output bg-white p-4 rounded-lg shadow-md overflow-auto max-h-[80vh]"
            ref={outputRef}>
            {isTyping ? (
              //  TypeAnimation react component adds the typing animation when the output arrives
              <TypeAnimation
                sequence={[animatedOutput, handleTypingComplete]}
                speed={typingSpeed}
                wrapper="div"
                className="whitespace-pre-line mb-1"
                cursor={false}
              />
            ) : (
              <div dangerouslySetInnerHTML={getMarkdownHTML(output)} style={{ lineHeight: '2' }} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Home
