import { Metadata } from 'next';
import MacWindow from "@/components/shared/windows/macWindow";

type LayoutProps = {
    children: React.ReactNode;
    params: { programTitle: string };
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    return {
        title: params.programTitle,
    };
}

export default function Layout({ children, params }: LayoutProps) {
    const { programTitle } = params;

    return (
        <MacWindow programTitle={programTitle}>
            {children}
        </MacWindow>
    );
}