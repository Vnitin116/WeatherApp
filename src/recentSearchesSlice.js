import { createSlice } from '@reduxjs/toolkit';
const recentSearchesSlice = createSlice({
    name: 'recentSearches',
    initialState: [],
    reducers: {
        addRecentSearch: (state, action) => {
            const { search } = action.payload
            state.unshift(search);
            console.log("state", state)
            console.log(action.payload)
            if (state.length > 5) {
                state.pop();
            }
        },
    },
});
export const { addRecentSearch } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;