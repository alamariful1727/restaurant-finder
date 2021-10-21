import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchVenue } from 'src/types/searchVenues';

// Define a type for the slice state
interface IVenueReducerState {
	selectedVenue?: ISearchVenue;
}

const key = 'rf-selectedVenue';

// Define the initial state using that type
const initialState: IVenueReducerState = {
	selectedVenue:
		typeof window !== 'undefined' && localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : undefined,
};

export const venueReducer = createSlice({
	name: 'search',
	initialState,
	reducers: {
		selectVenue: (state, action: PayloadAction<ISearchVenue>) => {
			window.localStorage.setItem(key, JSON.stringify(action.payload));
			state.selectedVenue = action.payload;
		},
		clearVenue: (state) => {
			window.localStorage.removeItem(key);
			state.selectedVenue = undefined;
		},
	},
});

// Action creators are generated for each case reducer function
export const { selectVenue, clearVenue } = venueReducer.actions;

export default venueReducer.reducer;
