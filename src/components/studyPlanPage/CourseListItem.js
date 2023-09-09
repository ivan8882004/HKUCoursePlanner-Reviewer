import { useDrag } from 'react-dnd'
import { itemTypes } from '../../DnDTypes'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import searchPlan from '../../functions/searchPlan'
import getCourses from '../../functions/getCourses'

function CourseListItem({ name, index, searchBar }) {
  const [dropDown, setDropDown] = useState(false)

  const { plan } = useSelector(state => {
    return state.studyPlan
  })

  const { courses } = useSelector(state => {
    return state.courses
  })

  let courseContent

  if (dropDown) { //set the drop down content
    const courseInfo = getCourses(name, courses)

    courseContent = (
      <div className="Content">
        <div>{courseInfo.fullName}</div>
        <div>
          Prereg:{' '}
          {courseInfo.prereg
            .map(list => '[' + list.map(item => item).join(' or ') + ']')
            .join(' and ')}
        </div>
        <div>Exclusive: {courseInfo.exclusive.join(' & ')}</div>
      </div>
    )
  } else {
    courseContent = ''
  }

  const [, drag] = useDrag(() => ({
    type: itemTypes.COURSE,
    item: { name, index: -1 },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  if (  //filter course with search term
    (name.includes(searchBar.toUpperCase()) || searchBar === '') &&
    !searchPlan(name, plan.length, plan)
  ) {
    return (
      <div key={index} ref={drag} className="CourseListItem">
        <div onClick={() => setDropDown(!dropDown)} className="Name">
          {name}
          <div>{courseContent}</div>
        </div>
      </div>
    )
  } else {
    return <div key={index} ref={drag}></div>
  }
}

export default CourseListItem
