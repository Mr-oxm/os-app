'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const CalculatorApp = () => {
    const [display, setDisplay] = useState({ main: '0', equation: '' })
    const [operation, setOperation] = useState('')
    const [prevValue, setPrevValue] = useState('')
    const [memory, setMemory] = useState(0)
    const [isRadians, setIsRadians] = useState(true)

    const handleNumberClick = (num: string) => {
        setDisplay(prev => ({
            main: prev.main === '0' ? num : prev.main + num,
            equation: prev.equation + num
        }))
    }

    const handleOperationClick = (op: string) => {
        setOperation(op)
        setPrevValue(display.main)
        setDisplay(prev => ({
            main: '0',
            equation: prev.equation + ` ${op} `
        }))
    }

    const handleEquals = () => {
        const current = parseFloat(display.main)
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

        setDisplay({
            main: result.toString(),
            equation: `${display.equation} = ${result}`
        })
        setOperation('')
        setPrevValue('')
    }

    const handleClear = () => {
        setDisplay({ main: '0', equation: '' })
        setOperation('')
        setPrevValue('')
    }

    const handleFunction = (func: string) => {
        const current = parseFloat(display.main)
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

        setDisplay({
            main: result.toString(),
            equation: `${func}(${display.main}) = ${result}`
        })
    }

    const factorial = (n: number): number => {
        if (n === 0 || n === 1) return 1
        return n * factorial(n - 1)
    }

    const handleMemory = (action: string) => {
        switch (action) {
            case 'M+': setMemory(memory + parseFloat(display.main)); break
            case 'M-': setMemory(memory - parseFloat(display.main)); break
            case 'MR': setDisplay(prev => ({ ...prev, main: memory.toString() })); break
            case 'MC': setMemory(0); break
        }
    }

    const toggleAngleMode = () => {
        setIsRadians(!isRadians)
    }

    const handleRemoveLast = () => {
        setDisplay(prev => ({
            main: prev.main.slice(0, -1) || '0',
            equation: prev.equation.slice(0, -1) || ''
        }))
    }

    return (
        <div className="w-full h-full p-4 flex flex-col shadow-md">
            <div className="mb-4 p-2 bg-card rounded text-foreground shadow-inner">
                <div className="text-sm text-muted-foreground mb-1">{display.equation?display.equation:"0"}</div>
                <div className="text-3xl font-bold">{display.main}</div>
            </div>
            <div className="grid grid-cols-5 gap-2 flex-grow">
                {['sin', 'cos', 'tan', 'log', 'ln'].map((btn) => (
                    <Button key={btn} onClick={() => handleFunction(btn)} className="h-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">{btn}</Button>
                ))}
                {['sqrt', 'pow', 'root', 'exp', 'abs'].map((btn) => (
                    <Button key={btn} onClick={() => btn === 'sqrt' ? handleFunction(btn) : handleOperationClick(btn)} className="h-full bg-accent hover:bg-accent/90 text-accent-foreground">{btn}</Button>
                ))}
                {['7', '8', '9', '/', 'M+'].map((btn) => (
                    <Button key={btn} onClick={() => ['/', 'M+'].includes(btn) ? (btn === 'M+' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className={`h-full ${['/', 'M+'].includes(btn) ? 'bg-muted hover:bg-muted/90 text-muted-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}>{btn}</Button>
                ))}
                {['4', '5', '6', '*', 'M-'].map((btn) => (
                    <Button key={btn} onClick={() => ['*', 'M-'].includes(btn) ? (btn === 'M-' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className={`h-full ${['*', 'M-'].includes(btn) ? 'bg-muted hover:bg-muted/90 text-muted-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}>{btn}</Button>
                ))}
                {['1', '2', '3', '-', 'MR'].map((btn) => (
                    <Button key={btn} onClick={() => ['-', 'MR'].includes(btn) ? (btn === 'MR' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className={`h-full ${['-', 'MR'].includes(btn) ? 'bg-muted hover:bg-muted/90 text-muted-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}>{btn}</Button>
                ))}
                {['0', '.', '⌫', '+', 'MC'].map((btn) => (
                    <Button 
                        key={btn} 
                        onClick={() => {
                            if (btn === '⌫') handleRemoveLast();
                            else if (['MC', '+'].includes(btn)) {
                                btn === 'MC' ? handleMemory(btn) : handleOperationClick(btn);
                            } else {
                                handleNumberClick(btn);
                            }
                        }} 
                        className={`h-full ${['⌫', 'MC', '+'].includes(btn) ? 'bg-muted hover:bg-muted/90 text-muted-foreground' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                    >
                        {btn}
                    </Button>
                ))}
                <Button onClick={handleClear} className="col-span-2 h-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">Clear</Button>
                <Button onClick={() => handleFunction('fact')} className="h-full bg-accent hover:bg-accent/90 text-accent-foreground">x!</Button>
                <Button onClick={toggleAngleMode} className="h-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">{isRadians ? 'RAD' : 'DEG'}</Button>
                <Button onClick={() => setDisplay(prev => ({ ...prev, main: Math.PI.toString() }))} className="h-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">π</Button>
                <Button onClick={handleEquals} className="col-span-5 h-full bg-ring hover:bg-ring/90 text-primary-foreground">=</Button>
            </div>
        </div>
    )
} 
export default CalculatorApp