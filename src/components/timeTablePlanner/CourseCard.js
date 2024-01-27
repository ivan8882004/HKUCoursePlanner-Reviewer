import { useContext, useEffect, useState } from 'react'
import TableContext from '../../context/SettingsProvider'

function CourseCard({
  course,
  deleteCourse,
  insertCourse,
  selectedCourseList,
  isSemOne,
  index,
  insertCourseByMouseEnter,
}) {
  const [isChecked, setIsChecked] = useState(false)

  const { setDetail } = useContext(TableContext)

  /*useEffect(() => {
        console.log(selectedCourseList);

    if (selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName ) ) {


        setIsChecked(true);

        course.isChecked = true;
        console.log("check box is checked?",course.isChecked);
        console.log(isChecked);
    }
    else {
        course.isChecked = false;
        setIsChecked(false);

    }

    }, [selectedCourseList]); */

  /*useEffect(() => {

    if (!selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName ) ) {
        course.isChecked = false;
        setIsChecked(false);

    }

    }, [selectedCourseList]);

    useEffect(() => {
        console.log(selectedCourseList);

    if (selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName && course_in_list.isChecked === true ) ) {

        setIsChecked(true);

    }

    }, [isSemOne]); */

  useEffect(() => {
    //console.log(selectedCourseList);

    if (
      selectedCourseList.some(
        course_in_list =>
          course_in_list.courseName === course.courseName &&
          course_in_list.isChecked
      )
    ) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [selectedCourseList, course.courseName])

  const handleChange = event => {
    const isCheckBoxChecked = event.target.checked
    //console.log("check box is checked?", isCheckBoxChecked)

    if (isCheckBoxChecked) {
      insertCourse(course)
    } else {
      deleteCourse(course)
    }

    // setIsChecked(!isChecked);
    setIsChecked(isCheckBoxChecked)
  }

  const handleMouseLeave = () => {
    if (!isChecked) {
      deleteCourse(course)
      setDetail(null)
    }
  }

  const handleMouseEnter = () => {
    if (!isChecked) {
      insertCourseByMouseEnter(course)
      setDetail(course)
    }
  }

  return (
    <label
      className="group mx-2 flex cursor-pointer items-center overflow-hidden hyphens-auto px-2 py-0.5 will-change-transform "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <input
        type="checkbox"
        className="mr-2 h-4 w-4 shrink-0 cursor-pointer appearance-none border-2 border-accent outline-none transition checked:bg-accent group-active:opacity-25"
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="w-full pl-2 transition-opacity hover:bg-accent hover:text-white group-active:opacity-25">
        {course.courseName}
        <div className="font-medium italic">{course.courseTitle}</div>
      </div>
    </label>
  )
}
export default CourseCard
