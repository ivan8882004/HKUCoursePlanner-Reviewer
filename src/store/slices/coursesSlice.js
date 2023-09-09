import { createSlice } from '@reduxjs/toolkit'

const COURSES = 'courses'

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload
      localStorage.setItem(COURSES, JSON.stringify(state.courses))
    },
    addCourses(state, action) {
      const index = state.courses.findIndex(
        course => course.name === action.payload.name
      )
      if (index !== -1) {
        state.courses = [
          ...state.courses.slice(0, index),
          action.payload,
          ...state.courses.slice(index + 1),
        ]
      } else {
        state.courses.push(action.payload)
      }
      state.courses.sort((a, b) => a.name.localeCompare(b.name))
      localStorage.setItem(COURSES, JSON.stringify(state.courses))
    },
    mergeCourses(state, action) {
      //do some thing
    },
    removeCourses(state, action) {
      state.courses = [
        ...state.courses.slice(0, action.payload),
        ...state.courses.slice(action.payload + 1),
      ]
      localStorage.setItem(COURSES, JSON.stringify(state.courses))
    },
    editCourses(state, action) {
      //do something
    },
  },
})

export const { setCourses, addCourses, removeCourses } = coursesSlice.actions
export const coursesReducer = coursesSlice.reducer
export { COURSES }
