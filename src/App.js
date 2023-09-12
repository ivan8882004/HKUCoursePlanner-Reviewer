import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TopBar from './components/TopBar'
import AddCoursePage from './pages/AddCoursePage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COURSES } from './store/slices/coursesSlice'
import {
  DEGREES,
  MAJORS,
  MINORS,
  setMajors,
  setMinors,
} from './store/slices/programsSlice'
import { setCourses, setDegrees, setStudyPlan } from './store/index'
import AddDegreePage from './pages/AddDegreePage'
import AddMajorMinorPage from './pages/AddMajorMinorPage'
import ViewProgramPage from './pages/ViewProgramPage'
import UploadExportFilePage from './pages/UploadExportFilePage'
import StudyPlanPage from './pages/StudyPlanPage'
import { STUDYPLAN } from './store/slices/studyPlanSlice'
import { TimeTableProvider } from './context/SettingsProvider'
import TimeTablePage from './pages/TimeTablePage'
import { redirect } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

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
    const toGo = localStorage.getItem("link");
    if (toGo !== null) {
      console.log(toGo)
    }
  }, [dispatch])

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/HKUCoursePlanner-Reviewer/" element={<HomePage />}></Route>
        <Route path="/HKUCoursePlanner-Reviewer/study_plan" element={<StudyPlanPage />}></Route>
        <Route path="/HKUCoursePlanner-Reviewer/view_program" element={<ViewProgramPage />}></Route>
        <Route path="/HKUCoursePlanner-Reviewer/add_course" element={<AddCoursePage />}></Route>
        <Route path="/HKUCoursePlanner-Reviewer/add_degree" element={<AddDegreePage />}></Route>
        <Route path="/HKUCoursePlanner-Reviewer/add_major_minor" element={<AddMajorMinorPage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/upload_export_file"
          element={<UploadExportFilePage />}></Route>
        <Route
          path="/HKUCoursePlanner-Reviewer/time_table"
          element={
            <TimeTableProvider>
              <TimeTablePage />
            </TimeTableProvider>
          }></Route>
      </Routes>
    </div>
  )
}

export default App
