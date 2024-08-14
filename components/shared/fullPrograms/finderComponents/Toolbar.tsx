import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdArrowBack, IoMdArrowForward, IoMdSearch } from 'react-icons/io';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';
import { FaSort } from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';
import { BreadcrumbNav } from './helperComponents';

interface ToolbarProps {
    sidebarVisible: boolean;
    setSidebarVisible: (visible: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleCreateNewFolder: () => void;
    setSortBy: (sortBy: 'name' | 'date' | 'size') => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    currentPath: string[];
}

const Toolbar: React.FC<ToolbarProps> = React.memo(({
    sidebarVisible,
    setSidebarVisible,
    searchTerm,
    setSearchTerm,
    handleCreateNewFolder,
    setSortBy,
    viewMode,
    setViewMode,
    currentPath
}) => (
    <div className='flex flex-col items-center card !rounded-t-none bgOpacity gap-1 !p-2'>
        <div className="flex items-center w-full">
            <div className='flex flex-row gap-2 w-1/2 md:w-1/4 justify-start'>
                <Button variant="ghost" size="icon" className='btn !rounded-full w-8 h-8' onClick={() => setSidebarVisible(!sidebarVisible)}>
                    <AiOutlineMenu className="lucidBarIcon" />
                </Button>
                <Button variant="ghost" size="icon" className='btn !rounded-full w-8 h-8'>
                    <IoMdArrowBack className="lucidBarIcon" />
                </Button>
                <Button variant="ghost" size="icon" className='btn !rounded-full w-8 h-8'>
                    <IoMdArrowForward className="lucidBarIcon" />
                </Button>
            </div>

            <div className='flex-row gap-2 flex-grow justify-center items-center !drop-shadow-none !shadow-none hidden md:flex'>
                <Input
                    className="flex-grow card !drop-shadow-none !shadow-none"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="ghost" size="icon" className='btn !rounded-full'>
                    <IoMdSearch className="lucidBarIcon" />
                </Button> 
            </div>

            <div className='flex flex-row gap-2 w-1/2 md:w-1/4 justify-end'>
                <Button variant="ghost" size="icon" className='btn !rounded-full w-8 h-8' onClick={handleCreateNewFolder}>
                    <MdCreateNewFolder className="lucidBarIcon" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className='btn !rounded-full w-8 h-8'>
                            <FaSort className="lucidBarIcon" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='card bgOpacity bgblur'>
                        <DropdownMenuItem className='text-xs' onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                        <DropdownMenuItem className='text-xs' onClick={() => setSortBy('date')}>Date</DropdownMenuItem>
                        <DropdownMenuItem className='text-xs' onClick={() => setSortBy('size')}>Size</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    variant="ghost"
                    size="icon" className='btn !rounded-full w-8 h-8'
                    onClick={() => setViewMode('grid')}
                >
                    <BsGrid3X3Gap className={`lucidBarIcon ${viewMode === 'grid' ? 'text-primary' : ''}`} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon" className='btn !rounded-full w-8 h-8'
                    onClick={() => setViewMode('list')}
                >
                    <BsListUl className={`lucidBarIcon ${viewMode === 'list' ? 'text-primary' : ''}`} />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className='btn !rounded-full w-8 h-8 md:hidden'>
                            <IoMdSearch className="lucidBarIcon" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='card bgOpacity bgblur'>
                        <Input
                        className="flex-grow card !drop-shadow-none !shadow-none"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <BreadcrumbNav path={currentPath}/>
    </div>
));

export default Toolbar;