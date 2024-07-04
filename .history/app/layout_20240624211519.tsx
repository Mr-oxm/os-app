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


const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  { name: "New Folder", content: "" },
  { name: "separator", content: "" },
  { name: "Get Info", content: "" },
  { name: "Change Wallpaper", content: "" },
  { name: "Edit Widgets", content: "" },
  { name: "Use Stacks", content: "" },
  { name: "separator", content: "" },
  { name: "Sort By", content: "Sort options..." },
  { name: "Show View Options", content: "" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ContextMenu>
          <ContextMenuTrigger>{children}</ContextMenuTrigger>
          <ContextMenuContent className="bg-background/20 backdrop-blur-sm p-2 text-foreground text-xs border-border/20 border-2 w-56">
            {menuItems.map((item, index) =>
              item.name === "separator" ? (
                <hr key={index} className="my-2 border-t border-border/20" />
              ) : (
                <ContextMenuItem key={index}>
                  {item.name}
                  {item.content && <div>{item.content}</div>}
                </ContextMenuItem>
              )
            )}
          </ContextMenuContent>
        </ContextMenu>
      </body>
    </html>
  );
}