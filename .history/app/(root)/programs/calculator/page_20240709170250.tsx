'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const page = () => {
    const [display, setDisplay] = useState('0')
    const [operation, setOperation] = useState('')
    const [prevValue, setPrevValue] = useState('')
    const [memory, setMemory] = useState(0)
    const [isRadians, setIsRadians] = useState(true)

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
            case '+': result = previous + current; break
            case '-': result = previous - current; break
            case '*': result = previous * current; break
            case '/': result = previous / current; break
            case 'pow': result = Math.pow(previous, current); break
            case 'root': result = Math.pow(previous, 1 / current); break
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

    const handleFunction = (func: string) => {
        const current = parseFloat(display)
        let result = 0

        switch (func) {
            case 'sin': result = isRadians ? Math.sin(current) : Math.sin(current * Math.PI / 180); break
            case 'cos': result = isRadians ? Math.cos(current) : Math.cos(current * Math.PI / 180); break
            case 'tan': result = isRadians ? Math.tan(current) : Math.tan(current * Math.PI / 180); break
            case 'log': result = Math.log10(current); break
            case 'ln': result = Math.log(current); break
            case 'sqrt': result = Math.sqrt(current); break
            case 'exp': result = Math.exp(current); break
            case 'abs': result = Math.abs(current); break
            case 'fact': result = factorial(current); break
        }

        setDisplay(result.toString())
    }

    const factorial = (n: number): number => {
        if (n === 0 || n === 1) return 1
        return n * factorial(n - 1)
    }

    const handleMemory = (action: string) => {
        switch (action) {
            case 'M+': setMemory(memory + parseFloat(display)); break
            case 'M-': setMemory(memory - parseFloat(display)); break
            case 'MR': setDisplay(memory.toString()); break
            case 'MC': setMemory(0); break
        }
    }

    const toggleAngleMode = () => {
        setIsRadians(!isRadians)
    }

    return (
        <div className="w-full h-full p-4 flex flex-col rounded-lg shadow-md">
            <div className="mb-4 p-2 bg-background rounded text-foreground text-2xl">
                {display}
            </div>
            <div className="grid grid-cols-5 gap-2 flex-grow">
                {['sin', 'cos', 'tan', 'log', 'ln'].map((btn) => (
                    <Button key={btn} onClick={() => handleFunction(btn)} className="h-full">{btn}</Button>
                ))}
                {['sqrt', 'pow', 'root', 'exp', 'abs'].map((btn) => (
                    <Button key={btn} onClick={() => btn === 'sqrt' ? handleFunction(btn) : handleOperationClick(btn)} className="h-full">{btn}</Button>
                ))}
                {['7', '8', '9', '/', 'M+'].map((btn) => (
                    <Button key={btn} onClick={() => ['/', 'M+'].includes(btn) ? (btn === 'M+' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className="h-full">{btn}</Button>
                ))}
                {['4', '5', '6', '*', 'M-'].map((btn) => (
                    <Button key={btn} onClick={() => ['*', 'M-'].includes(btn) ? (btn === 'M-' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className="h-full">{btn}</Button>
                ))}
                {['1', '2', '3', '-', 'MR'].map((btn) => (
                    <Button key={btn} onClick={() => ['-', 'MR'].includes(btn) ? (btn === 'MR' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className="h-full">{btn}</Button>
                ))}
                {['0', '.', '=', '+', 'MC'].map((btn) => (
                    <Button key={btn} onClick={() => btn === '=' ? handleEquals() : ['MC', '+'].includes(btn) ? (btn === 'MC' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className="h-full">{btn}</Button>
                ))}
                <Button onClick={handleClear} className="col-span-2 h-full">Clear</Button>
                <Button onClick={() => handleFunction('fact')} className="h-full">x!</Button>
                <Button onClick={toggleAngleMode} className="h-full">{isRadians ? 'RAD' : 'DEG'}</Button>
                <Button onClick={() => setDisplay(Math.PI.toString())} className="h-full">π</Button>
            </div>
        </div>
    )
}

export default page