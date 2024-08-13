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
    setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
    windowDir: number;
    windowType: number;
}