import React from "react";
import VideoSection from "./VideoSection";
import FilterList from "./FilterList";

function MainContainer() {
  return (
    <div className="pt-2 pl-8 flex flex-col gap-8 ml-14 w-screen">
      <FilterList />
      <VideoSection/>
    </div>
  );
}

export default MainContainer;
