import { useState } from 'react'
import SelectedCourseCard from './SelectedCourseCard'
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io'

function CourseList({
  selectedSem1CourseList,
  selectedSem2CourseList,
  deleteCourseinLists,
}) {
  const [sem1Open, setSem1Open] = useState(false)
  const [sem2Open, setSem2Open] = useState(false)

  return (
    <div className="selectedCourse">
      <div className="dropDowns">
        <div>
          <div onClick={() => setSem1Open(!sem1Open)} className="dropDownTitle">
            <div className="dropDownText">First Semester</div>{' '}
            <div className="dropDownArrow">
              {sem1Open ? <IoIosArrowDown /> : <IoIosArrowBack />}
            </div>
          </div>
        </div>
        <div className="dropDownContent">
          {sem1Open &&
            selectedSem1CourseList.map((course, index) => (
              <SelectedCourseCard
                key={index}
                course={course}
                deleteCourseinLists={deleteCourseinLists}
              />
            ))}
        </div>
        <div onClick={() => setSem2Open(!sem2Open)} className="dropDownTitle">
          <div className="dropDownText">Second Semester</div>{' '}
          <div className="dropDownArrow">
            {sem2Open ? <IoIosArrowDown /> : <IoIosArrowBack />}
          </div>
        </div>
        <div className="dropDownContent">
          {sem2Open &&
            selectedSem2CourseList.map((course, index) => (
              <SelectedCourseCard
                key={index}
                course={course}
                deleteCourseinLists={deleteCourseinLists}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CourseList
