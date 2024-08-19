export interface WindowProps {
    children: React.ReactNode;
    programId: string;
    minimized: boolean;
    name: string;
}

export interface ButtonProps {
    handleMinimize: () => void;
    handleMaximize: () => void;
    handleSplit: (direction: string) => void;
    setIsClosing: (isClosing:boolean) => void;
    windowDir: number;
    windowType: number;
}