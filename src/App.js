import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TopBar from "./components/TopBar";
import AddCoursePage from "./pages/AddCoursePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COURSES } from "./store/slices/coursesSlice";
import { DEGREES, MAJORS, MINORS, setMajors, setMinors } from "./store/slices/programsSlice";
import { setCourses, setDegrees } from "./store/index"
import AddDegreePage from "./pages/AddDegreePage";
import AddMajorMinorPage from "./pages/AddMajorMinorPage";


function App () {
    const dispatch = useDispatch()

    useEffect(() => {
        const storageCourses = localStorage.getItem(COURSES);
        if (storageCourses !== null) {
            dispatch(setCourses(JSON.parse(storageCourses)))
        }
        const storageDegree = localStorage.getItem(DEGREES);
        if (storageDegree !== null) {
            dispatch(setDegrees(JSON.parse(storageDegree)))
        }
        const storageMajor = localStorage.getItem(MAJORS);
        if (storageMajor !== null) {
            dispatch(setMajors(JSON.parse(storageMajor)))
        }
        const storageMinor = localStorage.getItem(MINORS);
        if (storageMinor !== null) {
            dispatch(setMinors(JSON.parse(storageMinor)))
        }
    }, [dispatch])

    return (
        <div className="App">
            <TopBar />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/course_planner" element={<div>Course</div>}></Route>
                <Route path="/view_major_minor" element={<div>Major Minor</div>}></Route>
                <Route path="/add_course" element={<AddCoursePage />}></Route>
                <Route path="/add_degree" element={<AddDegreePage />}></Route>
                <Route path="/add_major_minor" element={<AddMajorMinorPage />}></Route>
            </Routes>
        </div>
    )
}

export default App;