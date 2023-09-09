import { configureStore } from '@reduxjs/toolkit'
import {
  coursesReducer,
  setCourses,
  addCourses,
  removeCourses,
} from './slices/coursesSlice'
import {
  programsReducer,
  setDegrees,
  setMajors,
  setMinors,
  addDegrees,
  addMajors,
  addMinors,
  removeDegrees,
  removeMajors,
  removeMinors,
} from './slices/programsSlice'
import {
  studyPlanReducer,
  setStudyPlan,
  setPlan,
  setDegree,
  setMajor,
  setMinor1,
  setMinor2,
  addPlanItem,
  removePlanItem,
  addPlanFyp,
  removePlanFyp,
} from './slices/studyPlanSlice'

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    programs: programsReducer,
    studyPlan: studyPlanReducer,
  },
})

export {
  store,
  setCourses,
  addCourses,
  removeCourses,
  setDegrees,
  setMajors,
  setMinors,
  addDegrees,
  addMajors,
  addMinors,
  removeDegrees,
  removeMajors,
  removeMinors,
  setStudyPlan,
  setPlan,
  setDegree,
  setMajor,
  setMinor1,
  setMinor2,
  addPlanItem,
  removePlanItem,
  addPlanFyp,
  removePlanFyp,
}
