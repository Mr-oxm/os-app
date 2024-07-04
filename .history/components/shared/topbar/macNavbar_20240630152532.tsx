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
        Name: <Apple />,
        classname: 'w-11 h-full items-center',
        content: [
            { name: 'About This Mac', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'System Settings...', bs: false, shortcut: '' },
            { name: 'App Store...', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Recent Items', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Force Quit...', bs: false, shortcut: '⌘⌥⎋' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Sleep', bs: false, shortcut: '' },
            { name: 'Restart...', bs: false, shortcut: '' },
            { name: 'Shut Down...', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Lock Screen', bs: false, shortcut: '⌃⌘Q' },
            { name: 'Log Out', bs: false, shortcut: '⇧⌘Q' },
        ]
    },
    {
        Name: 'Finder',
        classname: 'font-bold',
        content: [
            { name: 'About Finder', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Preferences...', bs: false, shortcut: '⌘,' },
            { name: 'Empty Trash...', bs: false, shortcut: '⇧⌘⌫' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Services', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Hide Finder', bs: false, shortcut: '⌘H' },
            { name: 'Hide Others', bs: false, shortcut: '⌥⌘H' },
            { name: 'Show All', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Quit Finder', bs: false, shortcut: '⌘Q' },
        ]
    },
    {
        Name: 'File',
        classname: '',
        content: [
            { name: 'New Finder Window', bs: false, shortcut: '⌘N' },
            { name: 'New Folder', bs: false, shortcut: '⇧⌘N' },
            { name: 'New Smart Folder', bs: false, shortcut: '' },
            { name: 'New Tab', bs: false, shortcut: '⌘T' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Open', bs: false, shortcut: '⌘O' },
            { name: 'Open With', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Close Window', bs: false, shortcut: '⌘W' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Get Info', bs: false, shortcut: '⌘I' },
            { name: 'Rename', bs: false, shortcut: '' },
            { name: 'Compress', bs: false, shortcut: '' },
            { name: 'Duplicate', bs: false, shortcut: '⌘D' },
            { name: 'Make Alias', bs: false, shortcut: '' },
            { name: 'Quick Look', bs: false, shortcut: 'Space' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Move to Trash', bs: false, shortcut: '⌘⌫' },
            { name: 'Eject', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Find', bs: false, shortcut: '⌘F' },
        ]
    },
    {
        Name: 'Edit',
        classname: '',
        content: [
            { name: 'Undo', bs: false, shortcut: '⌘Z' },
            { name: 'Redo', bs: false, shortcut: '⇧⌘Z' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Cut', bs: false, shortcut: '⌘X' },
            { name: 'Copy', bs: false, shortcut: '⌘C' },
            { name: 'Paste', bs: false, shortcut: '⌘V' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Select All', bs: false, shortcut: '⌘A' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Show Clipboard', bs: false, shortcut: '' },
            { name: 'Start Dictation', bs: false, shortcut: '' },
            { name: 'Emoji & Symbols', bs: false, shortcut: '⌃⌘Space' },
        ]
    },
    {
        Name: 'View',
        classname: '',
        content: [
            { name: 'as Icons', bs: false, shortcut: '' },
            { name: 'as List', bs: false, shortcut: '' },
            { name: 'as Columns', bs: false, shortcut: '' },
            { name: 'as Gallery', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Use Stacks', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Show View Options', bs: false, shortcut: '⌘J' },
            { name: 'Show Path Bar', bs: false, shortcut: '' },
            { name: 'Show Status Bar', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Hide Sidebar', bs: false, shortcut: '⌥⌘S' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Enter Full Screen', bs: false, shortcut: '⌃⌘F' },
        ]
    },
    {
        Name: 'Go',
        classname: '',
        content: [
            { name: 'Back', bs: false, shortcut: '⌘[' },
            { name: 'Forward', bs: false, shortcut: '⌘]' },
            { name: 'Enclosing Folder', bs: false, shortcut: '⌘↑' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Recents', bs: false, shortcut: '' },
            { name: 'Documents', bs: false, shortcut: '' },
            { name: 'Desktop', bs: false, shortcut: '' },
            { name: 'Downloads', bs: false, shortcut: '' },
            { name: 'Home', bs: false, shortcut: '⇧⌘H' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Computer', bs: false, shortcut: '⇧⌘C' },
            { name: 'AirDrop', bs: false, shortcut: '' },
            { name: 'Network', bs: false, shortcut: '⇧⌘K' },
            { name: 'iCloud Drive', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Applications', bs: false, shortcut: '⇧⌘A' },
            { name: 'Utilities', bs: false, shortcut: '⇧⌘U' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Go to Folder', bs: false, shortcut: '⇧⌘G' },
            { name: 'Connect to Server', bs: false, shortcut: '⌘K' },
        ]
    },
    {
        Name: 'Window',
        classname: '',
        content: [
            { name: 'Minimize', bs: false, shortcut: '⌘M' },
            { name: 'Zoom', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Move Window to Left Side of Screen', bs: false, shortcut: '' },
            { name: 'Move Window to Right Side of Screen', bs: false, shortcut: '' },
            { name: 'Tile Window to Left of Screen', bs: false, shortcut: '' },
            { name: 'Tile Window to Right of Screen', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Enter Full Screen', bs: false, shortcut: '⌃⌘F' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Show Previous Tab', bs: false, shortcut: '⌃⇧⇥' },
            { name: 'Show Next Tab', bs: false, shortcut: '⌃⇥' },
            { name: 'Move Tab to New Window', bs: false, shortcut: '' },
            { name: 'Merge All Windows', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Bring All to Front', bs: false, shortcut: '' },
        ]
    },
    {
        Name: 'Help',
        classname: '',
        content: [
            { name: 'Search', bs: false, shortcut: '' },
            { name: 'separator', bs: true, shortcut: '' },
            { name: 'Mac Help', bs: false, shortcut: '' },
            { name: 'Keyboard Shortcuts', bs: false, shortcut: '' },
            { name: 'User Guide', bs: false, shortcut: '' },
        ]
    }
];

const macNavbar = () => {
    return (
        <>
            <NavigationMenu className="h-full !text-xs">
                <NavigationMenuList className="flex flex-row p-0 h-full items-stretch">
                    {MenuLinks.map((menu, i) => (
                        <NavigationMenuItem key={i}>
                            <NavigationMenuTrigger className={`bg-transparent py-0 px-4 h-full !text-foreground !text-xs hover:bg-background/40 ${menu.classname}`}>
                                {menu.Name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col p-2  sm:w-auto md:w-96  text-foreground">
                                {menu.content.map((item, index) => (
                                    item.name === 'separator' ?
                                        <hr className="border-foreground/15 mx-3 my-1" key={index} />
                                        :
                                        <NavigationMenuLink key={index}>
                                            <Button className="w-full !text-xs justify-start bg-transparent h-auto hover:bg-primary hover:!text-primary-foreground text-foreground"
                                                bs={item.bs}>
                                                {item.bs + ""} {item.shortcut && <span className="ml-auto opacity-50">{item.shortcut}</span>}
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
