import { NavLink } from 'react-router-dom'

function TopBar() {
  return (
    <div className="TopBar">
      <NavLink to="/HKUCoursePlanner-Reviewer/">Home</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/study_plan">Course Planner</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/view_program">View Major Minor</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/add_course">Add Course</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/add_degree">Add Degree</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/add_major_minor">Add Major Minor</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/upload_export_file">Upload Export File</NavLink>
      <NavLink to="/HKUCoursePlanner-Reviewer/time_table">Time Table</NavLink>
    </div>
  )
}

export default TopBar
