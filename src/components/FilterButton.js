import React from 'react'

function FilterButton({ buttonName }) {
  return (
    <div>
        <button className='bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg font-semibold'>{buttonName}</button>
    </div>
  )
}

export default FilterButton