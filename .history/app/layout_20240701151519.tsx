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
import { ChevronRight } from "lucide-react";


const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  { name: "New Folder", content: [] },
  { name: "separator", content: [] },
  { name: "Get Info", content: [] },
  { name: "Change Wallpaper", content: [] },
  { name: "Edit Widgets", content: [] },
  { name: "separator", content: [] },
  { name: "Use Stacks", content: [] },
  { name: "Sort By", content: ['Sort by Name', 'Sort by Date', 'Sort by Size', 'Sort by Type'] },
  { name: "Show View Options", content: [] },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark font-sans">
      <body className={inter.className}>
        <ContextMenu>
          <ContextMenuTrigger>{children}</ContextMenuTrigger> 
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
              <ContextMenuItem key={index} className="hover:!bg-primary !text-foreground hover:!text-primary-foreground !text-xs felx flex-row justify-between">
                {item.name}
              </ContextMenuItem> 
        )
      )}
    </ContextMenuContent>
  )
}