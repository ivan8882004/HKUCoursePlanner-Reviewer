import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { removePlanFyp, removePlanItem } from '../../store'
import checkPrereg from '../../functions/checkPrereg'
import checkExclusive from '../../functions/checkExclusive'
import { itemTypes } from '../../DnDTypes'

function SemCourseListItem({ course, ind, index }) {
  const dispatch = useDispatch()

  const { plan } = useSelector(state => {
    return state.studyPlan
  })

  const [dropDown, setDropDown] = useState(false)

  const [, drag] = useDrag(() => ({
    type: itemTypes.COURSE,
    item: { name: course.name, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  let courseContent

  if (dropDown) {
    courseContent = (
      <div className="Content">
        <div>{course.fullName}</div>
        <div>
          Prereg:{' '}
          {course.prereg
            .map(list => '[' + list.map(item => item).join(' or ') + ']')
            .join(' and ')}
        </div>
        <div>Exclusive: {course.exclusive.join(' & ')}</div>
      </div>
    )
  } else {
    courseContent = ''
  }

  const handleDropDown = () => {
    setDropDown(!dropDown)
  }

  const handleRemove = () => {
    if (parseInt(course.credit) === 6) {
      dispatch(removePlanItem({ index, course }))
    } else if (parseInt(course.credit) === 12) {
      dispatch(removePlanFyp({ index, course }))
    }
  }

  if (!checkPrereg(course, index, plan)) {
    return (
      <div key={ind} className="CoursePreregFail" ref={drag}>
        <div className="ErrorMessage" onClick={handleDropDown}>
          Prereg not filfull
          <div className="ErrorCourse">
            {course.prereg
              .map(list => '[' + list.map(item => item).join(' or ') + ']')
              .join(' and ')}
          </div>
        </div>
        <span onClick={handleDropDown}>{course.name}</span>
        <button onClick={handleRemove}>X</button>
        {courseContent}
      </div>
    )
  } else if (checkExclusive(course, index, plan)) {
    return (
      <div key={ind} className="CourseExclusive" ref={drag}>
        <div className="ErrorMessage" onClick={handleDropDown}>
          Have exclusive
          <div className="ErrorCourse">{course.exclusive.join(' & ')}</div>
        </div>
        <span onClick={handleDropDown}>{course.name}</span>
        <button onClick={handleRemove}>X</button>
        {courseContent}
      </div>
    )
  }
  return (
    <div key={ind} className="NormalCourse" ref={drag}>
      <span onClick={handleDropDown}>{course.name}</span>
      <button onClick={handleRemove}>X</button>
      {courseContent}
    </div>
  )
}

export default SemCourseListItem
