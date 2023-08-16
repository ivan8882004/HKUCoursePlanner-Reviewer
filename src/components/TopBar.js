import { NavLink } from "react-router-dom";

function TopBar (){
    return (
        <div className="TopBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/course_planner">Course Planner</NavLink>
            <NavLink to="/view_major_minor">View Major Minor</NavLink>
            <NavLink to="/add_course_major">Add Course Major</NavLink>
        </div>
    )
}

export default TopBar;