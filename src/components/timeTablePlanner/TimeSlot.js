import { useContext } from 'react'
import TableContext from '../../context/SettingsProvider'

function TimeSlot({ time, day, selectedCourseList }) {
  const { setDetail } = useContext(TableContext)

  const getRenderedTimeSlot = selectedCourseList => {
    const courses = selectedCourseList

    const timeslot_hours = time.split("-").map(ele => parseInt(ele.split(":")[0]))

    const filtered_courses = courses.filter(course => {
      const lecture = course.lectures.find(lecture => {
        const lecture_hours = [
          parseInt(lecture.time.slice(0, 2)),
          parseInt(lecture.time.slice(6, 8)),
        ]
        return (
          lecture.day === day &&
          timeslot_hours[0] >= lecture_hours[0] &&
          timeslot_hours[1] <= lecture_hours[1]
        )
      })
      // console.log(timeslot_hours, time, course)
      return lecture !== undefined
    })

    if (filtered_courses.length > 1) {
      const conflicted_course = filtered_courses.map(course => (
        <div key={course.courseName}>{course.courseName.split('-')[0]}</div>
      ))

      return (
        <div
          className="relative my-auto flex h-full justify-center"
          title={conflicted_course}>
          <div className="absolute">
            <div className="sticky top-0 font-medium backdrop-blur-lg">
              ⚠️Conflict
            </div>
            <div className="text-xs">{conflicted_course}</div>
          </div>
        </div>
      )
    } else if (filtered_courses.length === 1) {
      const course = filtered_courses[0]
      // const venues = course.lectures
      //   .filter(lecture => {
      //     const lecture_hours = [
      //       parseInt(lecture.time.slice(0, 2)),
      //       parseInt(lecture.time.slice(6, 8)),
      //     ]
      //     return (
      //       lecture.day === day &&
      //       timeslot_hours[0] >= lecture_hours[0] &&
      //       timeslot_hours[1] <= lecture_hours[1]
      //     )
      //   })
      //   .map(lecture => lecture.venue)
      //   .join(' or ')

      return (
        <div
          className="flex h-full w-full cursor-pointer flex-col justify-center overflow-hidden transition-opacity hover:bg-accent hover:text-white active:opacity-25"
          title={course.courseTitle}
          onClick={() => setDetail(course)}>
          <div className="font-mono font-medium">
            {course.courseName.split('-')[0]}
          </div>
          Class {course.courseName.split('-')[1]}
          {/* {venues} */}
        </div>
      )
    } else {
      return <div></div>
    }
  }

  // console.log('render')
  return getRenderedTimeSlot(selectedCourseList)
}

export default TimeSlot
