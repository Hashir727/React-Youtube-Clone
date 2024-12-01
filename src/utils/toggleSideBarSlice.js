import { createSlice } from "@reduxjs/toolkit";

const toggleSideBarSlice = createSlice({
    name: 'toggleSideBarSlice',
    initialState: {
        isSideBarOpen: true,
    },
    reducers: {
        toggleSideBar: (state) => {
            state.isSideBarOpen = !state.isSideBarOpen
        },
        closeSideBar: (state) => {
            state.isSideBarOpen = false
        }
    }

})

export const { toggleSideBar, closeSideBar } = toggleSideBarSlice.actions;
export default toggleSideBarSlice.reducer;