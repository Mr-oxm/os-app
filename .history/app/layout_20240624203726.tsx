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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
        <ContextMenuContent>
          <ContextMenuItem>New Folder</ContextMenuItem>
          <ContextMenuItem>New Folder with Selection</ContextMenuItem>
          <ContextMenuItem>Get Info</ContextMenuItem>
          <ContextMenuItem>Change Desktop Background</ContextMenuItem>
          <ContextMenuItem>Use Stacks</ContextMenuItem>
          <ContextMenuItem>Sort By</ContextMenuItem>
          <ContextMenuItem>Clean Up</ContextMenuItem>
          <ContextMenuItem>Clean Up By</ContextMenuItem>
          <ContextMenuItem>Show View Options</ContextMenuItem>
          <ContextMenuItem>Import from iPhone or iPad</ContextMenuItem>
          <ContextMenuItem>Quick Look</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
      </ContextMenu>

        
      </body>
    </html>
  );
}
