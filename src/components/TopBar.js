import { NavLink } from "react-router-dom";

function TopBar (){
    return (
        <div className="TopBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/study_plan">Course Planner</NavLink>
            <NavLink to="/view_program">View Major Minor</NavLink>
            <NavLink to="/add_course">Add Course</NavLink>
            <NavLink to="/add_degree">Add Degree</NavLink>
            <NavLink to="/add_major_minor">Add Major Minor</NavLink>
            <NavLink to="/upload_export_file">Upload Export File</NavLink>
        </div>
    )
}

export default TopBar;