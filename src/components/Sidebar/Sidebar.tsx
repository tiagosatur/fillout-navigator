import { useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import SidebarCards from './components/SidebarCards/SidebarCards';

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className=' bg-gray-50 h-screen overflow-y-auto p-4 border-r border-gray-200'>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <SidebarCards searchTerm={searchTerm} />
    </div>
  );
};
