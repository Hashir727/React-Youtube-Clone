import React from "react";
import { Link } from "react-router-dom";
import SideBarSections from "./SideBarSections";
import {
  Home as HomeIcon,
  PlayArrow as PlayArrowIcon,
  Subscriptions as SubscriptionsIcon,
  AccountBox as AccountBoxIcon,
  History as HistoryIcon,
  SmartDisplay as SmartDisplayIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Whatshot as WhatshotIcon,
  MusicNote as MusicNoteIcon,
  SportsEsports as SportsEsportsIcon,
  Newspaper as NewspaperIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";

function SideBar() {
  return (
    <div className="w-[12rem] flex flex-col ml-1 sticky top-0 bg-white hidden lg:block md:block sm:hidden">
      <Link to={"/"}><SideBarSections icon={HomeIcon} sectionName={"Home"} /></Link>
      <SideBarSections icon={PlayArrowIcon} sectionName={"Shorts"} />
      <SideBarSections icon={SubscriptionsIcon} sectionName={"Subscriptions"} />
      <hr className="my-3" />
      <div className="flex ml-4 items-center cursor-pointer hover:bg-gray-100 rounded-lg h-10">
        <p className="font-semibold text-lg">You</p>
        <KeyboardArrowRightIcon className="" />
      </div>
      <SideBarSections icon={AccountBoxIcon} sectionName={"Your Channel"} />
      <SideBarSections icon={HistoryIcon} sectionName={"History"} />
      <SideBarSections icon={SmartDisplayIcon} sectionName={"Your Videos"} />
      <hr className="my-3" />
      <div className="flex ml-4 items-center cursor-pointer hover:bg-gray-100 rounded-lg h-10">
        <p className="font-semibold text-lg">Explore</p>
        <KeyboardArrowRightIcon className="" />
      </div>
      <SideBarSections icon={WhatshotIcon} sectionName={"Trending"} />
      <SideBarSections icon={MusicNoteIcon} sectionName={"Music"} />
      <SideBarSections icon={SportsEsportsIcon} sectionName={"Gaming"} />
      <SideBarSections icon={NewspaperIcon} sectionName={"News"} />
      <SideBarSections icon={EmojiEventsIcon} sectionName={"Sports"} />

      <hr className="my-3" />
    </div>
  );
}

export default SideBar;
