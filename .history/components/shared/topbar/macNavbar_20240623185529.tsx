"use client"
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

const MenuLinks = [
    {
        Name: 'File',
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
        <div>
            {MenuLinks.map(menu=>(
                <div>
                    <span>menu.Name</span>
                    <ul>
                        {menu.content.map((item, index)=(
                            <li key={index}>{item}</li>
                    ))}
                    </ul>
                </div>
))}
            {/* <NavigationMenu>
                <NavigationMenuList>
                    {MenuLinks.map(menu => (
                        <NavigationMenuItem key={menu.Name}>
                            <NavigationMenuTrigger>{menu.Name}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                {menu.content.map((item, index) => (
                                    item === 'separator' ? 
                                        <NavigationMenuLink key={index}>
                                            <hr key={index} /> 
                                        </NavigationMenuLink>
                                        : 
                                        <NavigationMenuLink key={index}>
                                            {item}
                                        </NavigationMenuLink>
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu> */}
        </div>
    );
}

export default macNavbar;