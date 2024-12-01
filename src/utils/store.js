import { configureStore } from "@reduxjs/toolkit"
import toggleSideBarSlice from "./toggleSideBarSlice";

const store = configureStore({
    reducer: {
        toggle: toggleSideBarSlice,
    }
})

export default store;
