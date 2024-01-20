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
    <>
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
    </>
  )

  const handleClick = () => {
    setDropDown(!dropDown)
  }

  const hints = ['>', '×']

  return (
    <div className="m-5 flex w-fit items-center whitespace-nowrap border-2 border-dotted border-accent p-2">
      {listItem.extraMessage.length !== 0 && (
        <div className="mr-5">
          <div className="text-xs">with </div>
          {listItem.extraMessage.map(item => '[' + item + ']').join(' and ')}
        </div>
      )}
      <div
        className="cursor-pointer transition-opacity will-change-transform hover:bg-accent hover:text-white active:opacity-50"
        onClick={handleClick}>
        {listItem.name} {hints[dropDown ? 1 : 0]}
        <div className="font-medium italic">{listItem.fullName}</div>
        {dropDown && dropDownContent}
      </div>
      {listItem.isPrereg.length !== 0 && (
        <div className="ml-5">
          <PiArrowFatRightFill />
        </div>
      )}
      {listItem.isPrereg.length !== 0 && <div>{content}</div>}
    </div>
  )
}

export default PreregGraph
