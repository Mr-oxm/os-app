import React, { useState, useEffect } from 'react';

interface EchoIconProps {
    children: React.ReactNode; 
}

const EchoIcon: React.FC<EchoIconProps> = ({ children }) => {
    const [echoes, setEchoes] = useState<number[]>([]);

    const handleClick = () => {
        setEchoes((prev) => [...prev, Date.now()]); 
    };

    useEffect(() => {
        const timer = setTimeout(() => {
        setEchoes((prev) => prev.slice(1));
        }, 300);

        return () => clearTimeout(timer);
    }, [echoes]);

    return (
        <div className="relative">
            {echoes.map((id) => (
                <div
                key={id}
                className="absolute inset-0 animate-echo pointer-events-none"
                >
                    {children}
                </div>
            ))}
            <div onClick={handleClick}>{children}</div>
        </div>
    );
};


export default EchoIcon