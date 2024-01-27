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

  if (dropDown) {
    //set the drop down content
    const courseInfo = getCourses(name, courses)

    courseContent = (
      <>
        <div className="font-medium italic">{courseInfo.fullName}</div>
        <div>
          Prereq:{' '}
          {courseInfo.prereg
            .map(
              list =>
                '[' +
                list
                  .map(item => (item === 'M1/M2_2+' ? 'M1/M2>=Lv2' : item))
                  .join(' or ') +
                ']'
            )
            .join(' and ') || 'None'}
        </div>
        <div>MuEx: {courseInfo.exclusive.join(', ') || 'None'}</div>
      </>
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

  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const hints = ['>', '×']

  if (
    //filter course with search term
    (name.includes(searchBar.toUpperCase()) || searchBar === '') &&
    !searchPlan(name, plan.length, plan)
  ) {
    return (
      <div
        key={index}
        ref={drag}
        onClick={() => {
          setDropDown(!dropDown)
          setIsDropdownActive(!isDropdownActive)
        }}
        className="mx-2 mb-1 cursor-pointer overflow-hidden hyphens-auto border-2 border-accent px-2 py-0.5 transition-opacity hover:bg-accent hover:text-white active:opacity-25">
        {name} {hints[isDropdownActive ? 1 : 0]}
        {courseContent}
      </div>
    )
  } else {
    return false
  }
}

export default CourseListItem
