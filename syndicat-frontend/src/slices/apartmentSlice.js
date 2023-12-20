import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    apartmentDetails: null,
};

const apartmentDetailsSlice = createSlice({
    name: 'apartmentDetails',
    initialState,
    reducers: {
        updateApartmentDetails: (state, action) => {
            state.apartmentDetails = action.payload;
        },
        clearApartmentDetails: (state) => {
            state.apartmentDetails = null;
        },
    },
});

export const { updateApartmentDetails, clearApartmentDetails } = apartmentDetailsSlice.actions;

export default apartmentDetailsSlice.reducer;
