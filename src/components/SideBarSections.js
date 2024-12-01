import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

function SideBarSections({ icon: Icon, sectionName }) {
  return (
    <div className='flex cursor-pointer hover:bg-gray-100 rounded rounnded-xl h-10 flex items-center font-semibold gap-2 pl-4'>
      <Icon className="text-2xl h-8 w-8" />
      <span className='ml-2 text-md'>{sectionName}</span>
    </div>
  );
}

export default SideBarSections;
