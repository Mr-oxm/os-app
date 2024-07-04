"use client"
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,

} from "@/components/ui/navigation-menu"
import Apple from "@/components/icons/apple"

const MenuLinks = [
    {
        Name: <Apple/>,
        classname:'w-full h-full',
        content: [
            'New Finder Window',
            'New Folder',
            'New Smart Folder',
            'New Tab',
            'separator',
            'Open',
            'Open With',
            'separator',
            'Close Window',
            'separator',
            'Get Info',
            'Rename',
            'Compress',
            'Duplicate',
            'Make Alias',
            'Quick Look',
            'separator',
            'Move to Trash',
            'Eject',
            'separator',
            'Find'
        ]
    },
    {
        Name: 'Finder',
        classname:'font-bold',
        content: [
            'New Finder Window',
            'New Folder',
            'New Smart Folder',
            'New Tab',
            'separator',
            'Open',
            'Open With',
            'separator',
            'Close Window',
            'separator',
            'Get Info',
            'Rename',
            'Compress',
            'Duplicate',
            'Make Alias',
            'Quick Look',
            'separator',
            'Move to Trash',
            'Eject',
            'separator',
            'Find'
        ]
    },
    {
        Name: 'File',
        classname:'',
        content: [
            'New Finder Window',
            'New Folder',
            'New Smart Folder',
            'New Tab',
            'separator',
            'Open',
            'Open With',
            'separator',
            'Close Window',
            'separator',
            'Get Info',
            'Rename',
            'Compress',
            'Duplicate',
            'Make Alias',
            'Quick Look',
            'separator',
            'Move to Trash',
            'Eject',
            'separator',
            'Find'
        ]
    },
    {
        Name: 'Edit',
        classname:'',
        content: [
            'Undo',
            'Redo',
            'separator',
            'Cut',
            'Copy',
            'Paste',
            'separator',
            'Select All',
            'separator',
            'Show Clipboard',
            'Start Dictation',
            'Emoji & Symbols'
        ]
    },
    {
        Name: 'View',
        classname:'',
        content: [
            'as Icons',
            'as List',
            'as Columns',
            'as Gallery',
            'separator',
            'Use Stacks',
            'separator',
            'Show View Options',
            'Show Path Bar',
            'Show Status Bar',
            'separator',
            'Hide Sidebar',
            'separator',
            'Enter Full Screen'
        ]
    },
    {
        Name: 'Go',
        classname:'',
        content: [
            'Back',
            'Forward',
            'Enclosing Folder',
            'separator',
            'Recents',
            'Documents',
            'Desktop',
            'Downloads',
            'Home',
            'separator',
            'Computer',
            'AirDrop',
            'Network',
            'iCloud Drive',
            'separator',
            'Applications',
            'Utilities',
            'separator',
            'Go to Folder',
            'Connect to Server'
        ]
    },
    {
        Name: 'Window',
        classname:'',
        content: [
            'Minimize',
            'Zoom',
            'separator',
            'Move Window to Left Side of Screen',
            'Move Window to Right Side of Screen',
            'Tile Window to Left of Screen',
            'Tile Window to Right of Screen',
            'separator',
            'Enter Full Screen',
            'separator',
            'Show Previous Tab',
            'Show Next Tab',
            'Move Tab to New Window',
            'Merge All Windows',
            'separator',
            'Bring All to Front'
        ]
    },
    {
        Name: 'Help',
        classname:'',
        content: [
            'Search',
            'separator',
            'Mac Help',
            'Keyboard Shortcuts',
            'User Guide'
        ]
    }
];

const macNavbar = () => {
    return (
        <> 
            <NavigationMenu className="h-full !text-xs">
                <NavigationMenuList className="flex flex-row p-0 h-full">
                    {MenuLinks.map((menu,i) => (
                        <NavigationMenuItem key={i}>
                            <NavigationMenuTrigger className={`bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40 ${menu.classname}`}>
                                {menu.Name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-2  w-auto sm:w-96  text-foreground">
                                {menu.content.map((item, index) => (
                                    item === 'separator' ? 
                                        <hr className="border-foreground/15 mx-3 my-1" key={index} /> 
                                        
                                        : 
                                        <NavigationMenuLink key={index}>
                                            <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-primary hover:!text-primary-foreground text-foreground">
                                                {item}
                                            </Button>
                                        </NavigationMenuLink>
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}

export default macNavbar;