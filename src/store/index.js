import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer, setCourses, addCourses, removeCourses } from "./slices/coursesSlice";
import { programsReducer, setDegrees, setMajors, setMinors, addDegrees, addMajors, addMinors, removeDegrees, removeMajors, removeMinors } from "./slices/programsSlice";

const store = configureStore({
    reducer: {
        courses: coursesReducer, 
        programs: programsReducer
    }
});

export {
    store,
    setCourses, addCourses, removeCourses,
    setDegrees, setMajors, setMinors, addDegrees, addMajors, addMinors, removeDegrees, removeMajors, removeMinors 
}