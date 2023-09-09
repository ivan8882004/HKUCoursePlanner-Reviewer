import { useState } from 'react'
import { PiArrowFatRightFill } from 'react-icons/pi'
import { useSelector } from 'react-redux'

function PreregGraph({ listItem }) {
  const [dropDown, setDropDown] = useState(false)

  const { courses } = useSelector(state => {
    return state.courses
  })

  const getCourses = name => {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].name === name) {
        return courses[i]
      }
    }
  }

  const courseInfo = getCourses(listItem.name)

  const content = listItem.isPrereg.map((item, index) => {
    return <PreregGraph listItem={item} key={index} />
  })

  const dropDownContent = (
    <div>
      <div>Name: {courseInfo.name}</div>
      <div>Full Name: {courseInfo.fullName}</div>
      <div>
        Prereg:{' '}
        {courseInfo.prereg
          .map(list => '[' + list.map(item => item).join(' or ') + ']')
          .join(' and ')}
      </div>
    </div>
  )

  const handleClick = () => {
    setDropDown(!dropDown)
  }

  return (
    <div className="CourseBox">
      <div>
        {listItem.extraMessage.length !== 0 && (
          <div className="CourseBoxSubTitle">with</div>
        )}
        <div className="CourseBoxPrereg">
          {listItem.extraMessage.map(item => '(' + item + ')').join('&')}
        </div>
      </div>
      <div className="CourseBoxCurrentCourse">
        <div className="CourseBoxName" onClick={handleClick}>
          {listItem.name}
        </div>
        <div className="CourseBoxFullName" onClick={handleClick}>
          {listItem.fullName}
        </div>
        {dropDown && dropDownContent}
      </div>
      <div>{listItem.isPrereg.length !== 0 && <PiArrowFatRightFill />}</div>
      {listItem.isPrereg.length !== 0 && (
        <div className="CourseBoxIsPrereg">{content}</div>
      )}
    </div>
  )
}

export default PreregGraph
