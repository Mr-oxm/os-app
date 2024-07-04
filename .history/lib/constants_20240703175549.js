import {LayoutGrid, Palette, Wallpaper} from "lucide-react" 
import Apple from "@/components/icons/apple"
export const menuItems = [
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

export const settingsMenu= [
    {name:"Theme", icon: <Palette className="w-4 h-4"/>},
    {name:"Wallpaper", icon: <Wallpaper className="w-4 h-4"/>},
    {name:"Icons", icon: <LayoutGrid className="w-4 h-4"/>},
]

export const NavbarLinks = [
    {
        Name: <Apple />,
        classname: 'w-11 h-full items-center',
        content: [
            { name: 'About This Mac', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'System Settings...', disabled: false, shortcut: '' },
            { name: 'App Store...', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Recent Items', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Force Quit...', disabled: false, shortcut: '⌘⌥⎋' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Sleep', disabled: false, shortcut: '' },
            { name: 'Restart...', disabled: false, shortcut: '' },
            { name: 'Shut Down...', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Lock Screen', disabled: false, shortcut: '⌃⌘Q' },
            { name: 'Log Out', disabled: false, shortcut: '⇧⌘Q' },
        ]
    },
    {
        Name: 'Finder',
        classname: 'font-bold',
        content: [
            { name: 'About Finder', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Preferences...', disabled: false, shortcut: '⌘,' },
            { name: 'Empty Trash...', disabled: false, shortcut: '⇧⌘⌫' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Services', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Hide Finder', disabled: false, shortcut: '⌘H' },
            { name: 'Hide Others', disabled: false, shortcut: '⌥⌘H' },
            { name: 'Show All', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Quit Finder', disabled: false, shortcut: '⌘Q' },
        ]
    },
    {
        Name: 'File',
        classname: '',
        content: [
            { name: 'New Finder Window', disabled: false, shortcut: '⌘N' },
            { name: 'New Folder', disabled: false, shortcut: '⇧⌘N' },
            { name: 'New Smart Folder', disabled: false, shortcut: '' },
            { name: 'New Tab', disabled: false, shortcut: '⌘T' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Open', disabled: false, shortcut: '⌘O' },
            { name: 'Open With', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Close Window', disabled: false, shortcut: '⌘W' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Get Info', disabled: false, shortcut: '⌘I' },
            { name: 'Rename', disabled: false, shortcut: '' },
            { name: 'Compress', disabled: false, shortcut: '' },
            { name: 'Duplicate', disabled: false, shortcut: '⌘D' },
            { name: 'Make Alias', disabled: false, shortcut: '' },
            { name: 'Quick Look', disabled: false, shortcut: 'Space' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Move to Trash', disabled: false, shortcut: '⌘⌫' },
            { name: 'Eject', disabled: false, shortcut: '' },
            { name: 'separator', disabled: true, shortcut: '' },
            { name: 'Find', disabled: false, shortcut: '⌘F' },
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

export const TaskbarIcons = [
    {
        imgSrc: {
            'Mac': "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/884c8c0cc7a505ac50339c9552263524_B7DXS2NKpM.png",
            'Windows': "https://img.icons8.com/?size=100&id=Jw9nt2gzEivq&format=png&color=000000",
            'Linux': "https://img.icons8.com/?size=100&id=12160&format=png&color=000000"
        },
        name: "Finder",
        route: "/programs/finder"
    },
    {
        imgSrc: {
            'Mac': "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/580889ee3811c11886dc163ee59b9d92_V7Od0GfbVh.png",
            'Windows': "https://img.icons8.com/?size=100&id=kJr8od2fGcmF&format=png&color=000000",
            'Linux': "https://img.icons8.com/?size=100&id=FC0CAXRYUMDK&format=png&color=000000"
        },
        name: "Launchpad",
        route: "/programs/launchpad"
    },
    {
        imgSrc: {
            'Mac': "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/2daefe2173c9ccc78a108eb9dd805565_eJCDM3QFYI.png",
            'Windows': "https://img.icons8.com/?size=100&id=WbRVMGxHh74X&format=png&color=000000",
            'Linux': "https://img.icons8.com/?size=100&id=UjcGNVXknmz3&format=png&color=000000"
        },
        name: "Terminal",
        route: "/programs/terminal"
    },
    {
        imgSrc: {
            'Mac': "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/66c7ae19964613c774a3751916d496b3_yNBo22mIIb.png",
            'Windows': "https://img.icons8.com/?size=100&id=s5NUIabJrb4C&format=png&color=000000",
            'Linux': "https://img.icons8.com/?size=100&id=12784&format=png&color=000000"
        },
        name: "Settings",
        route: "/programs/settings"
    },
    {
        imgSrc: {
            'Mac': "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/f4c0c6c2336b6433aaf11ed6353769d0_low_res_Calculator.png",
            'Windows': "https://img.icons8.com/?size=100&id=RNsqmCP8joVQ&format=png&color=000000",
            'Linux': "https://img.icons8.com/?size=100&id=HRiDkQyfFVUI&format=png&color=000000"
        },
        name: "Calculator",
        route: "/programs/calculator"
    },
    {
        imgSrc: {
            'Mac': "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/db1241171cb324621c222ad116d80972_f8Y65N7lzM.png",
            'Windows': "https://img.icons8.com/?size=100&id=74176&format=png&color=000000",
            'Linux': "https://img.icons8.com/?size=100&id=m4iIvAQ6DtQd&format=png&color=000000"
        },
        name: "Trash",
        route: "/programs/trash"
    }
];

export const FoldersIcons=[
    {
        "files":{
            'Mac':'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/603d0ef71252ee0d12081181dfd66041_FPDXUjhF0d.png',
            'Windows':'https://img.icons8.com/?size=100&id=dINnkNb1FBl4&format=png&color=000000',
            'Linux':'https://img.icons8.com/?size=100&id=12160&format=png&color=000000'
        }
    }, 
    {
        "images":{
            'Mac':'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/03eff150f49a92733f924070c7ef9710_T0nAamycYI.png',
            'Windows':'https://img.icons8.com/?size=100&id=K5ZTlMA55wO5&format=png&color=000000',
            'Linux':'https://img.icons8.com/?size=100&id=12160&format=png&color=000000'
        }
    }, 
    {
        "work":{
            'Mac':'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/49bceb48dd145c3b3813033204ec47d7_79Y863vmNB.png',
            'Windows':'https://img.icons8.com/?size=100&id=ammytsPgShZy&format=png&color=000000',
            'Linux':'https://img.icons8.com/?size=100&id=12160&format=png&color=000000'
        }
    },
    {
        "speical":{
            'Mac':'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/7a560aeb23196a7de8e2c7406ea98878_low_res_macOS_Sparkle_Folder.png',
            'Windows':'https://img.icons8.com/?size=100&id=5AcPk4yh4E4F&format=png&color=000000',
            'Linux':'https://img.icons8.com/?size=100&id=12160&format=png&color=000000'
        }
    } 
]

export const DesktopIcons = [
    {
        id: "work",
        imgSrc: FoldersIcons.find,
        name: "Work"
    },
    {
        id: "images",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/03eff150f49a92733f924070c7ef9710_T0nAamycYI.png",
        name: "Images"
    },
    {
        id: "speical",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/eddffe019686cec3f5a2ab0688e9b1c8_P82lWODEHL.png",
        name: "Speical"
    },
    {
        id: "files",
        imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/603d0ef71252ee0d12081181dfd66041_FPDXUjhF0d.png",
        name: "Files"
    }
];

export const systemThemes=[
    'light', 'dark','windows11-light','windows11-dark', 'ubuntu-light', 'ubuntu-dark','elementary-light', 'elementary-dark', "retro-amber", 'retro-green', 'high-contrast-light', 'high-contrast-dark','solarized-light','solarized-dark'
]