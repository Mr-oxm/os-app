import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dock.css";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
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
    <html lang="en" className="light">
      <body className={inter.className}>
        <ContextMenu>
          <ContextMenuTrigger>{children}</ContextMenuTrigger>
          <ContextMenuContent className=" bgOpacity  bgblur card w-56">
            {menuItems.map((item, index) =>
              item.name === "separator" ? (
                <hr key={index} className="border-foreground/15 mx-2 my-1" />
              ) : (
                // <>
                //   {item.content.length===0 ? 
                    <ContextMenuItem key={index} className="hover:!bg-primary  !hover:text-primary-foreground !text-xs felx flex-row justify-between">
                      {item.name}
                      {/* {item.content && <ChevronRight className="lucidBarIcon"/>}  */}
                    </ContextMenuItem>
                //   :
                //     <ContextMenuSub>
                //       <ContextMenuSubTrigger className="hover:!bg-foreground/15 !text-xs" inset>{item.name}</ContextMenuSubTrigger>
                //       <ContextMenuSubContent className="w-48"> 
                //         {item.content.map((cname,index)=>(
                //           <ContextMenuItem key={index}>{cname} </ContextMenuItem> 
                //         ))} 
                //       </ContextMenuSubContent>
                //     </ContextMenuSub>
                //   }
                // </>
              )
            )}
          </ContextMenuContent>
        </ContextMenu>
      </body>
    </html>
  );
}