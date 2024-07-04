const FullDesktop=({children}:{children:any})=>{
    return(
        <main className="flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden">
            <MacTopbar/>
            <MainDesktopBody children={children}/>
            <MainTaskbar/>
        </main>
    )
}

export default Full