import { useState } from 'react'
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
      {courseInfo.prereg.length > 0
        ? courseInfo.prereg
            .map((list, listIndex) => (
              <span key={listIndex}>
                {courseInfo.prereg.length > 1 && list.length > 1 ? '[ ' : ''}
                {list
                  .map((item, itemIndex) =>
                    item === 'M1/M2_2+' ? (
                      <span key={itemIndex}>M1/M2{'>'}=Lv2</span>
                    ) : (
                      <span key={itemIndex} className="font-mono">
                        {item}
                      </span>
                    )
                  )
                  .reduce((prev, curr, index) => [
                    prev,
                    index > 0 ? ' / ' : '',
                    curr,
                  ])}
                {courseInfo.prereg.length > 1 && list.length > 1 ? ' ]' : ''}
              </span>
            ))
            .reduce((prev, curr, index) => [prev, index > 0 ? ' & ' : '', curr])
        : 'None'}
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
          <div className="text-xs">with</div>
          {listItem.extraMessage.map(item => '[ ' + item + ' ]').join(' & ')}
        </div>
      )}
      <div
        className="cursor-pointer transition-opacity will-change-transform hover:bg-accent hover:text-white active:opacity-25"
        onClick={handleClick}>
        <span className="font-mono">{listItem.name}</span>{' '}
        {hints[dropDown ? 1 : 0]}
        <div className="font-medium italic">{listItem.fullName}</div>
        {dropDown && dropDownContent}
      </div>
      {listItem.isPrereg.length !== 0 && <div className="ml-5 text-xl">➠</div>}
      {listItem.isPrereg.length !== 0 && <div>{content}</div>}
    </div>
  )
}

export default PreregGraph
