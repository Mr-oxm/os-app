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
            { name: 'About This Mac', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'System Settings...', disabled: False, shortcut: '' },
            { name: 'App Store...', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Recent Items', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Force Quit...', disabled: False, shortcut: '⌘⌥⎋' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Sleep', disabled: False, shortcut: '' },
            { name: 'Restart...', disabled: False, shortcut: '' },
            { name: 'Shut Down...', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Lock Screen', disabled: False, shortcut: '⌃⌘Q' },
            { name: 'Log Out', disabled: False, shortcut: '⇧⌘Q' },
        ]
    },
    {
        Name: 'Finder',
        classname: 'font-bold',
        content: [
            { name: 'About Finder', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Preferences...', disabled: False, shortcut: '⌘,' },
            { name: 'Empty Trash...', disabled: False, shortcut: '⇧⌘⌫' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Services', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Hide Finder', disabled: False, shortcut: '⌘H' },
            { name: 'Hide Others', disabled: False, shortcut: '⌥⌘H' },
            { name: 'Show All', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Quit Finder', disabled: False, shortcut: '⌘Q' },
        ]
    },
    {
        Name: 'File',
        classname: '',
        content: [
            { name: 'New Finder Window', disabled: False, shortcut: '⌘N' },
            { name: 'New Folder', disabled: False, shortcut: '⇧⌘N' },
            { name: 'New Smart Folder', disabled: False, shortcut: '' },
            { name: 'New Tab', disabled: False, shortcut: '⌘T' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Open', disabled: False, shortcut: '⌘O' },
            { name: 'Open With', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Close Window', disabled: False, shortcut: '⌘W' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Get Info', disabled: False, shortcut: '⌘I' },
            { name: 'Rename', disabled: False, shortcut: '' },
            { name: 'Compress', disabled: False, shortcut: '' },
            { name: 'Duplicate', disabled: False, shortcut: '⌘D' },
            { name: 'Make Alias', disabled: False, shortcut: '' },
            { name: 'Quick Look', disabled: False, shortcut: 'Space' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Move to Trash', disabled: False, shortcut: '⌘⌫' },
            { name: 'Eject', disabled: False, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Find', disabled: False, shortcut: '⌘F' },
        ]
    },
    {
        Name: 'Edit',
        classname: '',
        content: [
            { name: 'Undo', disabled: false, shortcut: '⌘Z' },
            { name: 'Redo', disabled: false, shortcut: '⇧⌘Z' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Cut', disabled: false, shortcut: '⌘X' },
            { name: 'Copy', disabled: false, shortcut: '⌘C' },
            { name: 'Paste', disabled: false, shortcut: '⌘V' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Select All', disabled: false, shortcut: '⌘A' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Show Clipboard', disabled: false, shortcut: '' },
            { name: 'Start Dictation', disabled: false, shortcut: '' },
            { name: 'Emoji & Symbols', disabled: false, shortcut: '⌃⌘Space' },
        ]
    },
    {
        Name: 'View',
        classname: '',
        content: [
            { name: 'as Icons', disabled: false, shortcut: '' },
            { name: 'as List', disabled: false, shortcut: '' },
            { name: 'as Columns', disabled: false, shortcut: '' },
            { name: 'as Gallery', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Use Stacks', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Show View Options', disabled: false, shortcut: '⌘J' },
            { name: 'Show Path Bar', disabled: false, shortcut: '' },
            { name: 'Show Status Bar', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Hide Sidebar', disabled: false, shortcut: '⌥⌘S' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Enter Full Screen', disabled: false, shortcut: '⌃⌘F' },
        ]
    },
    {
        Name: 'Go',
        classname: '',
        content: [
            { name: 'Back', disabled: false, shortcut: '⌘[' },
            { name: 'Forward', disabled: false, shortcut: '⌘]' },
            { name: 'Enclosing Folder', disabled: false, shortcut: '⌘↑' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Recents', disabled: false, shortcut: '' },
            { name: 'Documents', disabled: false, shortcut: '' },
            { name: 'Desktop', disabled: false, shortcut: '' },
            { name: 'Downloads', disabled: false, shortcut: '' },
            { name: 'Home', disabled: false, shortcut: '⇧⌘H' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Computer', disabled: false, shortcut: '⇧⌘C' },
            { name: 'AirDrop', disabled: false, shortcut: '' },
            { name: 'Network', disabled: false, shortcut: '⇧⌘K' },
            { name: 'iCloud Drive', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Applications', disabled: false, shortcut: '⇧⌘A' },
            { name: 'Utilities', disabled: false, shortcut: '⇧⌘U' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Go to Folder', disabled: false, shortcut: '⇧⌘G' },
            { name: 'Connect to Server', disabled: false, shortcut: '⌘K' },
        ]
    },
    {
        Name: 'Window',
        classname: '',
        content: [
            { name: 'Minimize', disabled: false, shortcut: '⌘M' },
            { name: 'Zoom', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Move Window to Left Side of Screen', disabled: false, shortcut: '' },
            { name: 'Move Window to Right Side of Screen', disabled: false, shortcut: '' },
            { name: 'Tile Window to Left of Screen', disabled: false, shortcut: '' },
            { name: 'Tile Window to Right of Screen', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Enter Full Screen', disabled: false, shortcut: '⌃⌘F' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Show Previous Tab', disabled: false, shortcut: '⌃⇧⇥' },
            { name: 'Show Next Tab', disabled: false, shortcut: '⌃⇥' },
            { name: 'Move Tab to New Window', disabled: false, shortcut: '' },
            { name: 'Merge All Windows', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Bring All to Front', disabled: false, shortcut: '' },
        ]
    },
    {
        Name: 'Help',
        classname: '',
        content: [
            { name: 'Search', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Mac Help', disabled: false, shortcut: '' },
            { name: 'Keyboard Shortcuts', disabled: false, shortcut: '' },
            { name: 'User Guide', disabled: false, shortcut: '' },
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
                                                disabled={item.disabled}>
                                                {item.name} {item.shortcut && <span className="ml-auto opacity-50">{item.shortcut}</span>}
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
