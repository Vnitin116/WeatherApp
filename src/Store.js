import { configureStore } from "@reduxjs/toolkit";
import recentSearchesSlice from "./recentSearchesSlice";
const store = configureStore({
    reducer: {
        recentSearches: recentSearchesSlice
    },
});
export default store;