import { createSlice } from '@reduxjs/toolkit'

const DEGREES = 'degrees'
const MAJORS = 'majors'
const MINORS = 'minors'

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    degrees: [],
    majors: [],
    minors: [],
  },
  reducers: {
    setDegrees(state, action) {
      state.degrees = action.payload
      localStorage.setItem(DEGREES, JSON.stringify(state.degrees))
    },
    setMajors(state, action) {
      state.majors = action.payload
      localStorage.setItem(MAJORS, JSON.stringify(state.majors))
    },
    setMinors(state, action) {
      state.minors = action.payload
      localStorage.setItem(MINORS, JSON.stringify(state.minors))
    },
    addDegrees(state, action) {
      const index = state.degrees.findIndex(
        degree => degree.name === action.payload.name
      )
      if (index !== -1) {
        state.degrees = [
          ...state.degrees.slice(0, index),
          action.payload,
          ...state.degrees.slice(index + 1),
        ]
      } else {
        state.degrees.push(action.payload)
      }
      state.degrees.sort((a, b) => a.name.localeCompare(b.name))
      localStorage.setItem(DEGREES, JSON.stringify(state.degrees))
    },
    addMajors(state, action) {
      const index = state.majors.findIndex(
        major => major.name === action.payload.name
      )
      if (index !== -1) {
        state.majors = [
          ...state.majors.slice(0, index),
          action.payload,
          ...state.majors.slice(index + 1),
        ]
      } else {
        state.majors.push(action.payload)
      }
      state.majors.sort((a, b) => a.name.localeCompare(b.name))
      localStorage.setItem(MAJORS, JSON.stringify(state.majors))
    },
    addMinors(state, action) {
      const index = state.minors.findIndex(
        minor => minor.name === action.payload.name
      )
      if (index !== -1) {
        state.minors = [
          ...state.minors.slice(0, index),
          action.payload,
          ...state.minors.slice(index + 1),
        ]
      } else {
        state.minors.push(action.payload)
      }
      state.minors.sort((a, b) => a.name.localeCompare(b.name))
      localStorage.setItem(MINORS, JSON.stringify(state.minors))
    },
    removeDegrees(state, action) {
      state.degrees = [
        ...state.degrees.slice(0, action.payload),
        ...state.degrees.slice(action.payload + 1),
      ]
      localStorage.setItem(DEGREES, JSON.stringify(state.degrees))
    },
    removeMajors(state, action) {
      state.majors = [
        ...state.majors.slice(0, action.payload),
        ...state.majors.slice(action.payload + 1),
      ]
      localStorage.setItem(MAJORS, JSON.stringify(state.majors))
    },
    removeMinors(state, action) {
      state.minors = [
        ...state.minors.slice(0, action.payload),
        ...state.minors.slice(action.payload + 1),
      ]
      localStorage.setItem(MINORS, JSON.stringify(state.minors))
    },
  },
})

export const {
  setDegrees,
  setMajors,
  setMinors,
  addDegrees,
  addMajors,
  addMinors,
  removeDegrees,
  removeMajors,
  removeMinors,
} = programsSlice.actions
export const programsReducer = programsSlice.reducer
export { DEGREES, MAJORS, MINORS }
