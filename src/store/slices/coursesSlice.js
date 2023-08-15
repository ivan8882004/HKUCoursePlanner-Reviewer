import { createSlice, nanoid } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
    name: "courses",
    initialState: {
        courses: []
    },
    reducers: {
        setCourses(state, action){
            state.courses = action.payload;
        }
    }
})

export const { setCourses } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;