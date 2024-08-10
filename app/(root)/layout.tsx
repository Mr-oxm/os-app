import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; 
// import "../themes.css"; 
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem, 
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { menuItems } from "@/lib/constants"; 
import { ThemeProvider } from "@/components/ui/theme-provider"
import FullDesktop from "@/components/shared/FullDesktop"; 

const inter = Inter({ subsets: ["latin"] }); 

export const metadata: Metadata = {
  title: 'OXM OS',
  description: 'The most cuzstomizable Web OS', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <link rel="icon" href="/icons/os_icon2.svg" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <FullDesktop children={children}/>
            {/* <ContextMenu>
              <ContextMenuTrigger></ContextMenuTrigger> 
              <MenuContent/>
            </ContextMenu> */}
        </ThemeProvider>
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

