import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dock.css";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem, 
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { menuItems } from "@/lib/constants";
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody";
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar";
import MacTopbar from "@/components/shared/topbar/macTopbar";


const inter = Inter({ subsets: ["latin"] }); 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark font-sans">
      <body className={inter.className}>
        <ContextMenu>
          <ContextMenuTrigger><Desktop{children}</ContextMenuTrigger> 
          <MenuContent/>
        </ContextMenu>
      </body>
    </html>
  );
}



const MenuContent= ()=>{
  return(
    <ContextMenuContent className=" bgOpacity  bgblur card w-56">
      {menuItems.map((item, index) =>
        item.name === "separator" ? (
          <hr key={index} className="border-foreground/15 mx-2 my-1" />
        ) : ( 
              <ContextMenuItem key={index} className="hover:!bg-primary !text-foreground hover:!text-primary-foreground !text-xs felx flex-row justify-between ">
                {item.name}
              </ContextMenuItem> 
        )
      )}
    </ContextMenuContent>
  )
}

const Desktop=({children}:{children:any})=>{
return(
    <main className="flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden">
      <MacTopbar/>
      <MainDesktopBody children={children}/>
      <MainTaskbar/>
    </main>
)
}