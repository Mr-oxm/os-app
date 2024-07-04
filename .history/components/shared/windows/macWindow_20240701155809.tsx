import React from 'react';

const MacWindow = () => {
    return (
        <div className="card bgblur bgOpacity w-full h-full p-4"> 
            <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-2">
                    <span className="w-3 h-3 bg- rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex-grow text-center text-lg font-semibold">
                    Program Title
                </div>
                <div className="flex-grow"></div>
            </div>
            <div>
                {/* Additional content can go here */}
            </div>
        </div>
    )
}

export default MacWindow;
