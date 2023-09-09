import { NavLink } from 'react-router-dom'

function TopBar() {
  return (
    <div className="TopBar">
      <NavLink to="/Course-Planner-Host-Fork/">Home</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/study_plan">Course Planner</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/view_program">View Major Minor</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/add_course">Add Course</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/add_degree">Add Degree</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/add_major_minor">Add Major Minor</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/upload_export_file">Upload Export File</NavLink>
      <NavLink to="/Course-Planner-Host-Fork/time_table">Time Table</NavLink>
    </div>
  )
}

export default TopBar
