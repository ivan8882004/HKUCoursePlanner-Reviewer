import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer, setCourses } from "./slices/coursesSlice";

const store = configureStore({
    reducer: {
        courses: coursesReducer
    }
});

export {
    store,
    setCourses
}