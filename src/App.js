import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TopBar from "./components/TopBar";

function App () {
    return (
        <div className="App">
            <TopBar />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/add_course_major" element={<div>Add</div>}></Route>
                <Route path="/course_planner" element={<div>Course</div>}></Route>
                <Route path="/view_major_minor" element={<div>Major Minor</div>}></Route>
            </Routes>
        </div>
    )
}

export default App;