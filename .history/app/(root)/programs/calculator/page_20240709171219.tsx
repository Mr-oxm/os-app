'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const page = () => {
    // ... (previous state and function definitions remain the same)

    return (
        <div className="w-full h-full p-4 flex flex-col rounded-lg shadow-md bg-gray-100">
            <div className="mb-4 p-2 bg-white rounded text-gray-800 shadow-inner">
                <div className="text-sm text-gray-500 mb-1">{display.equation}</div>
                <div className="text-3xl font-bold">{display.main}</div>
            </div>
            <div className="grid grid-cols-5 gap-2 flex-grow">
                {['sin', 'cos', 'tan', 'log', 'ln'].map((btn) => (
                    <Button key={btn} onClick={() => handleFunction(btn)} className="h-full bg-blue-500 hover:bg-blue-600">{btn}</Button>
                ))}
                {['sqrt', 'pow', 'root', 'exp', 'abs'].map((btn) => (
                    <Button key={btn} onClick={() => btn === 'sqrt' ? handleFunction(btn) : handleOperationClick(btn)} className="h-full bg-green-500 hover:bg-green-600">{btn}</Button>
                ))}
                {['7', '8', '9', '/', 'M+'].map((btn) => (
                    <Button key={btn} onClick={() => ['/', 'M+'].includes(btn) ? (btn === 'M+' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className={`h-full ${['/', 'M+'].includes(btn) ? 'bg-purple-500 hover:bg-purple-600' : 'bg-orange-500 hover:bg-orange-600'}`}>{btn}</Button>
                ))}
                {['4', '5', '6', '*', 'M-'].map((btn) => (
                    <Button key={btn} onClick={() => ['*', 'M-'].includes(btn) ? (btn === 'M-' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className={`h-full ${['*', 'M-'].includes(btn) ? 'bg-purple-500 hover:bg-purple-600' : 'bg-orange-500 hover:bg-orange-600'}`}>{btn}</Button>
                ))}
                {['1', '2', '3', '-', 'MR'].map((btn) => (
                    <Button key={btn} onClick={() => ['-', 'MR'].includes(btn) ? (btn === 'MR' ? handleMemory(btn) : handleOperationClick(btn)) : handleNumberClick(btn)} className={`h-full ${['-', 'MR'].includes(btn) ? 'bg-purple-500 hover:bg-purple-600' : 'bg-orange-500 hover:bg-orange-600'}`}>{btn}</Button>
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
                        className={`h-full ${['⌫', 'MC', '+'].includes(btn) ? 'bg-purple-500 hover:bg-purple-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                    >
                        {btn}
                    </Button>
                ))}
                <Button onClick={handleClear} className="col-span-2 h-full bg-red-500 hover:bg-red-600">Clear</Button>
                <Button onClick={() => handleFunction('fact')} className="h-full bg-green-500 hover:bg-green-600">x!</Button>
                <Button onClick={toggleAngleMode} className="h-full bg-yellow-500 hover:bg-yellow-600">{isRadians ? 'RAD' : 'DEG'}</Button>
                <Button onClick={() => setDisplay(prev => ({ ...prev, main: Math.PI.toString() }))} className="h-full bg-pink-500 hover:bg-pink-600">π</Button>
                <Button onClick={handleEquals} className="col-span-5 h-full bg-indigo-500 hover:bg-indigo-600">=</Button>
            </div>
        </div>
    )
}

export default page