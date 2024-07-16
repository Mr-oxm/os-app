'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [currentOperation, setCurrentOperation] = useState(null);
    const [previousValue, setPreviousValue] = useState(null);

    const handleNumberClick = (number: string) => {
        setDisplay(prevDisplay => prevDisplay === '0' ? number : prevDisplay + number);
    };

    const handleOperationClick = (operation: string) => {
        setCurrentOperation(operation);
        setPreviousValue(parseFloat(display));
        setDisplay('0');
    };

    const handleEquals = () => {
        const current = parseFloat(display);
        let result = 0;
        switch (currentOperation) {
            case '+':
                result = previousValue + current;
                break;
            case '-':
                result = previousValue - current;
                break;
            case '*':
                result = previousValue * current;
                break;
            case '/':
                result = previousValue / current;
                break;
        }
        setDisplay(result.toString());
        setCurrentOperation(null);
        setPreviousValue(null);
    };

    const handleClear = () => {
        setDisplay('0');
        setCurrentOperation(null);
        setPreviousValue(null);
    };

    const buttonClass = "w-16 h-16 m-1 text-lg font-semibold";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-lg p-6">
                <div className="mb-4 bg-gray-200 p-4 rounded-lg">
                    <div className="text-right text-3xl font-bold">{display}</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {['7', '8', '9', '/'].map((btn) => (
                        <Button
                            key={btn}
                            onClick={() => btn === '/' ? handleOperationClick(btn) : handleNumberClick(btn)}
                            className={`${buttonClass} ${btn === '/' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                        >
                            {btn}
                        </Button>
                    ))}
                    {['4', '5', '6', '*'].map((btn) => (
                        <Button
                            key={btn}
                            onClick={() => btn === '*' ? handleOperationClick(btn) : handleNumberClick(btn)}
                            className={`${buttonClass} ${btn === '*' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                        >
                            {btn}
                        </Button>
                    ))}
                    {['1', '2', '3', '-'].map((btn) => (
                        <Button
                            key={btn}
                            onClick={() => btn === '-' ? handleOperationClick(btn) : handleNumberClick(btn)}
                            className={`${buttonClass} ${btn === '-' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                        >
                            {btn}
                        </Button>
                    ))}
                    <Button
                        onClick={() => handleNumberClick('0')}
                        className={`${buttonClass} bg-gray-300 hover:bg-gray-400`}
                    >
                        0
                    </Button>
                    <Button
                        onClick={() => handleNumberClick('.')}
                        className={`${buttonClass} bg-gray-300 hover:bg-gray-400`}
                    >
                        .
                    </Button>
                    <Button
                        onClick={handleEquals}
                        className={`${buttonClass} bg-green-500 hover:bg-green-600`}
                    >
                        =
                    </Button>
                    <Button
                        onClick={() => handleOperationClick('+')}
                        className={`${buttonClass} bg-blue-500 hover:bg-blue-600`}
                    >
                        +
                    </Button>
                    <Button
                        onClick={handleClear}
                        className={`${buttonClass} col-span-4 bg-red-500 hover:bg-red-600`}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;