import Image, { StaticImageData } from 'next/image';
import React, { useState, useCallback, useRef } from 'react';

interface EchoIconProps {
    children: React.ReactNode;
    imgsrc:any;
}

const EchoIcon: React.FC<EchoIconProps> = ({ children, imgsrc }) => {
    const [echoes, setEchoes] = useState<number[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = useCallback(() => {
        const now = Date.now();
        setEchoes(prev => [...prev, now]);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setEchoes(prev => prev.filter(time => now - time < 300));
        }, 300);
        setEchoes([0]);
    }, []);

    return (
        <div className="relative">
            {echoes.map((id) => (
                <div
                    key={id}
                    className="absolute inset-0 animate-echo pointer-events-none"
                >
                    <Image key={id} src={imgsrc} width={500} height={500} alt="echo"/>
                </div>
            ))}
            <div onClick={handleClick}>{children}</div>
        </div>
    );
};

export default EchoIcon;