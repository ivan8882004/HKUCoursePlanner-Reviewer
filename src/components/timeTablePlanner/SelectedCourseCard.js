import { AiFillDelete } from 'react-icons/ai'

function SelectedCourseCard({ course, deleteCourseinLists }) {
  const handleOnClick = () => {
    course.isChecked = false
    deleteCourseinLists(course)
  }

  return (
    <div className="listContainer">
      <div className="cardColumn">
        <div>
          <p>
            {course.courseName}
            <br></br>
            <span className="fullName">{course.courseTitle}</span>
          </p>
        </div>
        <div className="deleteButton">
          <AiFillDelete onClick={handleOnClick} />
        </div>
      </div>
    </div>
  )
}

export default SelectedCourseCard
