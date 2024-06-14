import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import TopBar from './components/TopBar'
import defaultConfig from './config.json'
import { TimeTableProvider } from './context/SettingsProvider'
import AddCoursePage from './pages/AddCoursePage'
import AddDegreePage from './pages/AddDegreePage'
import AddMajorMinorPage from './pages/AddMajorMinorPage'
import Best8CalPage from './pages/Best8CalPage'
import HomePage from './pages/HomePage'
import StudyPlanPage from './pages/StudyPlanPage'
import TimeTablePage from './pages/TimeTablePage'
import UploadExportFilePage from './pages/UploadExportFilePage'
import ViewProgramPage from './pages/ViewProgramPage'
import { setCourses, setDegrees, setStudyPlan } from './store/index'
import { COURSES } from './store/slices/coursesSlice'
import {
  DEGREES,
  MAJORS,
  MINORS,
  setMajors,
  setMinors,
} from './store/slices/programsSlice'
import { STUDYPLAN } from './store/slices/studyPlanSlice'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const storageCourses = localStorage.getItem(COURSES)
    if (storageCourses !== null) {
      dispatch(setCourses(JSON.parse(storageCourses)))
    }
    const storageDegree = localStorage.getItem(DEGREES)
    if (storageDegree !== null) {
      dispatch(setDegrees(JSON.parse(storageDegree)))
    }
    const storageMajor = localStorage.getItem(MAJORS)
    if (storageMajor !== null) {
      dispatch(setMajors(JSON.parse(storageMajor)))
    }
    const storageMinor = localStorage.getItem(MINORS)
    if (storageMinor !== null) {
      dispatch(setMinors(JSON.parse(storageMinor)))
    }
    const storageStudyPlan = localStorage.getItem(STUDYPLAN)
    if (storageStudyPlan !== null) {
      dispatch(setStudyPlan(JSON.parse(storageStudyPlan)))
    }
    if (storageCourses + storageDegree + storageMajor + storageMinor === 0) {
      dispatch(setCourses(defaultConfig.courses))
      dispatch(setDegrees(defaultConfig.degrees))
      dispatch(setMajors(defaultConfig.majors))
      dispatch(setMinors(defaultConfig.minors))
    }
    const toGo = location.search
    if (toGo) {
      console.log(toGo)
      navigate(toGo.slice(2))
    }
  }, [dispatch, location, navigate])

  return (
    <div className="h-dvh min-h-[40rem] w-screen font-poppins">
      <TopBar />
      <Routes>
        <Route
          path="/HKUCoursePlanner-Reviewer/"
          element={<HomePage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/study-plan"
          element={<StudyPlanPage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/degree-roadmap"
          element={<ViewProgramPage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/add_course"
          element={<AddCoursePage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/add_degree"
          element={<AddDegreePage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/add_major_minor"
          element={<AddMajorMinorPage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/config"
          element={<UploadExportFilePage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/timetable"
          element={
            <TimeTableProvider>
              <TimeTablePage />
            </TimeTableProvider>
          }></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/best-8-calculator"
          element={<Best8CalPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
