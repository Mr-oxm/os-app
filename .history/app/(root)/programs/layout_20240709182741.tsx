import { usePathname } from 'next/navigation';
import MacWindow from "@/components/shared/windows/macWindow";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname();
    const programTitle = pathname?.split('/').pop() || '';

    return (
        <MacWindow programTitle={programTitle}>
            {children}
        </MacWindow>
    )
}

export default Layout;