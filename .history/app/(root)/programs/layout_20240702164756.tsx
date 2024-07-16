import MacWindow from "@/components/shared/windows/macWindow";

const layout = ({children,}: Readonly<{children: React.ReactNode;}>) => {
    return (
        <MacWindow children={children}/>
    )
}
export default layout