'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const page = () => {
    const [display, setDisplay] = useState('0')
    const [operation, setOperation] = useState('')
    const [prevValue, setPrevValue] = useState('')

    const handleNumberClick = (num: string) => {
        setDisplay(prev => prev === '0' ? num : prev + num)
    }

    const handleOperationClick = (op: string) => {
        setOperation(op)
        setPrevValue(display)
        setDisplay('0')
    }

    const handleEquals = () => {
        const current = parseFloat(display)
        const previous = parseFloat(prevValue)
        let result = 0

        switch (operation) {
        case '+':
            result = previous + current
            break
        case '-':
            result = previous - current
            break
        case '*':
            result = previous * current
            break
        case '/':
            result = previous / current
            break
        }

        setDisplay(result.toString())
        setOperation('')
        setPrevValue('')
    }

    const handleClear = () => {
        setDisplay('0')
        setOperation('')
        setPrevValue('')
    }

    return (
        <div className="w-full h-full p-4 flex flex-col  rounded-lg shadow-md">
            <div className="mb-4 p-2 bg-background rounded text-foreground text-2xl">
                {display}
            </div>
            <div className="grid grid-cols-4 gap-2 flex-grow">
                {['7', '8', '9', '/'].map((btn) => (
                <Button 
                    key={btn} 
                    onClick={() => btn === '/' ? handleOperationClick(btn) : handleNumberClick(btn)}
                    className=""
                >
                    {btn}
                </Button>
                ))}
                {['4', '5', '6', '*'].map((btn) => (
                <Button 
                    key={btn} 
                    onClick={() => btn === '*' ? handleOperationClick(btn) : handleNumberClick(btn)}
                    className="\h-12\"
                >
                    {btn}
                </Button>
                ))}
                {['1', '2', '3', '-'].map((btn) => (
                <Button 
                    key={btn} 
                    onClick={() => btn === '-' ? handleOperationClick(btn) : handleNumberClick(btn)}
                    className="h-12"
                >
                    {btn}
                </Button>
                ))}
                <Button onClick={() => handleNumberClick('0')} className="h-12">0</Button>
                <Button onClick={() => handleNumberClick('.')} className="h-12">.</Button>
                <Button onClick={handleEquals} className="h-12">=</Button>
                <Button onClick={() => handleOperationClick('+')} className="h-12">+</Button>
                <Button onClick={handleClear} className="col-span-4 h-12">Clear</Button>
            </div>
        </div>
    )
}

export default page