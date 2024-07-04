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
            { name: 'About This Mac', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'System Settings...', bState: false, shortcut: '' },
            { name: 'App Store...', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Recent Items', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Force Quit...', bState: false, shortcut: '⌘⌥⎋' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Sleep', bState: false, shortcut: '' },
            { name: 'Restart...', bState: false, shortcut: '' },
            { name: 'Shut Down...', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Lock Screen', bState: false, shortcut: '⌃⌘Q' },
            { name: 'Log Out', bState: false, shortcut: '⇧⌘Q' },
        ]
    },
    {
        Name: 'Finder',
        classname: 'font-bold',
        content: [
            { name: 'About Finder', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Preferences...', bState: false, shortcut: '⌘,' },
            { name: 'Empty Trash...', bState: false, shortcut: '⇧⌘⌫' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Services', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Hide Finder', bState: false, shortcut: '⌘H' },
            { name: 'Hide Others', bState: false, shortcut: '⌥⌘H' },
            { name: 'Show All', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Quit Finder', bState: false, shortcut: '⌘Q' },
        ]
    },
    {
        Name: 'File',
        classname: '',
        content: [
            { name: 'New Finder Window', bState: false, shortcut: '⌘N' },
            { name: 'New Folder', bState: false, shortcut: '⇧⌘N' },
            { name: 'New Smart Folder', bState: false, shortcut: '' },
            { name: 'New Tab', bState: false, shortcut: '⌘T' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Open', bState: false, shortcut: '⌘O' },
            { name: 'Open With', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Close Window', bsState: false, shortcut: '⌘W' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Get Info', bState: false, shortcut: '⌘I' },
            { name: 'Rename', bState: false, shortcut: '' },
            { name: 'Compress', bState: false, shortcut: '' },
            { name: 'Duplicate', bState: false, shortcut: '⌘D' },
            { name: 'Make Alias', bState: false, shortcut: '' },
            { name: 'Quick Look', bState: false, shortcut: 'Space' },
            { name: 'separator', bsState: true, shortcut: '' },
            { name: 'Move to Trash', bState: false, shortcut: '⌘⌫' },
            { name: 'Eject', bState: false, shortcut: '' },
            { name: 'separator', bsState: true, shortcut: '' },
            { name: 'Find', bsState: false, shortcut: '⌘F' },
        ]
    },
    {
        Name: 'Edit',
        classname: '',
        content: [
            { name: 'Undo', bState: false, shortcut: '⌘Z' },
            { name: 'Redo', bState: false, shortcut: '⇧⌘Z' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Cut', bState: false, shortcut: '⌘X' },
            { name: 'Copy', bState: false, shortcut: '⌘C' },
            { name: 'Paste', bState: false, shortcut: '⌘V' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Select All', bState: false, shortcut: '⌘A' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Show Clipboard', bState: false, shortcut: '' },
            { name: 'Start Dictation', bState: false, shortcut: '' },
            { name: 'Emoji & Symbols', bState: false, shortcut: '⌃⌘Space' },
        ]
    },
    {
        Name: 'View',
        classname: '',
        content: [
            { name: 'as Icons', bState: false, shortcut: '' },
            { name: 'as List', bState: false, shortcut: '' },
            { name: 'as Columns', bState: false, shortcut: '' },
            { name: 'as Gallery', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Use Stacks', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Show View Options', bState: false, shortcut: '⌘J' },
            { name: 'Show Path Bar', bState: false, shortcut: '' },
            { name: 'Show Status Bar', bState: false, shortcut: '' },
            { name: 'separator', bsState: true, shortcut: '' },
            { name: 'Hide Sidebar', bState: false, shortcut: '⌥⌘S' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Enter Full Screen', bState: false, shortcut: '⌃⌘F' },
        ]
    },
    {
        Name: 'Go',
        classname: '',
        content: [
            { name: 'Back', bState: false, shortcut: '⌘[' },
            { name: 'Forward', bState: false, shortcut: '⌘]' },
            { name: 'Enclosing Folder', bState: false, shortcut: '⌘↑' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Recents', bState: false, shortcut: '' },
            { name: 'Documents', bState: false, shortcut: '' },
            { name: 'Desktop', bState: false, shortcut: '' },
            { name: 'Downloads', bState: false, shortcut: '' },
            { name: 'Home', bState: false, shortcut: '⇧⌘H' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Computer', bState: false, shortcut: '⇧⌘C' },
            { name: 'AirDrop', bState: false, shortcut: '' },
            { name: 'Network', bState: false, shortcut: '⇧⌘K' },
            { name: 'iCloud Drive', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Applications', bState: false, shortcut: '⇧⌘A' },
            { name: 'Utilities', bState: false, shortcut: '⇧⌘U' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Go to Folder', bState: false, shortcut: '⇧⌘G' },
            { name: 'Connect to Server', bState: false, shortcut: '⌘K' },
        ]
    },
    {
        Name: 'Window',
        classname: '',
        content: [
            { name: 'Minimize', bState: false, shortcut: '⌘M' },
            { name: 'Zoom', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Move Window to Left Side of Screen', bState: false, shortcut: '' },
            { name: 'Move Window to Right Side of Screen', bState: false, shortcut: '' },
            { name: 'Tile Window to Left of Screen', bState: false, shortcut: '' },
            { name: 'Tile Window to Right of Screen', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Enter Full Screen', bState: false, shortcut: '⌃⌘F' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Show Previous Tab', bState: false, shortcut: '⌃⇧⇥' },
            { name: 'Show Next Tab', bState: false, shortcut: '⌃⇥' },
            { name: 'Move Tab to New Window', bState: false, shortcut: '' },
            { name: 'Merge All Windows', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Bring All to Front', bState: false, shortcut: '' },
        ]
    },
    {
        Name: 'Help',
        classname: '',
        content: [
            { name: 'Search', bState: false, shortcut: '' },
            { name: 'separator', bState: true, shortcut: '' },
            { name: 'Mac Help', bState: false, shortcut: '' },
            { name: 'Keyboard Shortcuts', bState: false, shortcut: '' },
            { name: 'User Guide', bState: false, shortcut: '' },
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
                                                disabled={item.bState}>
                                                {item.bState + ""} {item.shortcut && <span className="ml-auto opacity-50">{item.shortcut}</span>}
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
