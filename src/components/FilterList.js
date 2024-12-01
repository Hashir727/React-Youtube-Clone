import React, { useRef } from "react";
import FilterButton from "./FilterButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardRightLeftIcon from "@mui/icons-material/KeyboardArrowRight";

const list = [
  { name: "All" },
  { name: "Live" },
  { name: "Podcasts" },
  { name: "Sports" },
  { name: "Music" },
  { name: "Debates" },
  { name: "News" },
  { name: "Computer" },
];

function FilterList() {
  return (
    <div className="">
      <div className="flex gap-3">
        {list.map((item, index) => (
          <FilterButton key={index} buttonName={item.name} />
        ))}
      </div>
    </div>
  );
}

export default FilterList;
