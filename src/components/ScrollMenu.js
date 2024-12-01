// import React, { useRef } from 'react';
// import FilterButton from './FilterButton';

// function FilterList() {
//   const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
//     }
//   };

//   return (
//     <div className="filter_list-container">
//       <div className="flex items-center">
//         <div className="filter_list" ref={scrollRef}>
//           <FilterButton buttonName="All" />
//           <FilterButton buttonName="Live" />
//           <FilterButton buttonName="Podcasts" />
//           <FilterButton buttonName="Sports" />
//           <FilterButton buttonName="Music" />
//           <FilterButton buttonName="Debates" />
//           <FilterButton buttonName="News" />
//           <FilterButton buttonName="Computer" />
//           <FilterButton buttonName="Debates" />
//           <FilterButton buttonName="Debates" />
//         </div>
//         <div className="scroll-arrows">
//           <button onClick={scrollLeft}>&lt;</button>
//           <button onClick={scrollRight}>&gt;</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilterList;
