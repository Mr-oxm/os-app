'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

const Terminal = () => {
  const [history, setHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand()
    }
  }

  const executeCommand = () => {
    // Here you would implement your command execution logic
    const output = `Executed: ${currentCommand}`
    setHistory([...history, { type: 'command', content: currentCommand }, { type: 'output', content: output }])
    setCurrentCommand('')
  }

  return (
    <div className="bg-black text-green-500 p-4 rounded-lg font-mono text-sm h-[500px] w-[800px]">
      <ScrollArea className="h-full" ref={terminalRef}>
        {history.map((item, index) => (
          <div key={index} className={item.type === 'command' ? 'text-white' : 'text-green-500'}>
            {item.type === 'command' ? '$ ' : ''}{item.content}
          </div>
        ))}
        <div className="flex">
          <span className="text-white">$ </span>
          <div
            className="outline-none flex-grow"
            contentEditable
            onKeyDown={handleKeyDown}
            onInput={(e) => setCurrentCommand(e.currentTarget.textContent)}
            dangerouslySetInnerHTML={{ __html: currentCommand }}
          />
          <span className="animate-blink">|</span>
        </div>
      </ScrollArea>
    </div>
  )
}

export default Terminal