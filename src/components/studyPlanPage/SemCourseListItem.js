import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { removePlanFyp, removePlanItem } from '../../store'
import checkPrereg from '../../functions/checkPrereg'
import checkExclusive from '../../functions/checkExclusive'
import { itemTypes } from '../../DnDTypes'

//course item in each box for a sem

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
      <>
        <div className="font-medium italic">{course.fullName}</div>
        <div>
          Prereq:{' '}
          {course.prereg.length > 0
            ? course.prereg
                .map((list, listIndex) => (
                  <span key={listIndex}>
                    {course.prereg.length > 1 && list.length > 1 ? '[ ' : ''}
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
                    {course.prereg.length > 1 && list.length > 1 ? ' ]' : ''}
                  </span>
                ))
                .reduce((prev, curr, index) => [
                  prev,
                  index > 0 ? ' & ' : '',
                  curr,
                ])
            : 'None'}
        </div>
        <div>
          MuEx:{' '}
          {course.exclusive.length > 0
            ? course.exclusive
                .map((item, index) => (
                  <span key={index} className="font-mono">
                    {item}
                  </span>
                ))
                .reduce((prev, curr) => [prev, ' / ', curr])
            : 'None'}
        </div>
      </>
    )
  } else {
    courseContent = ''
  }

  const handleDropDown = () => {
    setDropDown(!dropDown)
    setIsDropdownActive(!isDropdownActive)
  }

  const [isAnimateRemove, setIsAnimateRemove] = useState(false)
  const handleRemove = () => {
    if (parseInt(course.credit) === 6) {
      dispatch(removePlanItem({ index, course }))
    } else if (parseInt(course.credit) === 12) {
      dispatch(removePlanFyp({ index, course }))
    }
  }

  const courseListItemClasses =
    'mb-1 cursor-pointer break-words border-2 border-accent py-0.5 px-2 hover:bg-accent hover:text-white transition-opacity active:opacity-25'

  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const hints = ['>', '×']

  const removeBtnClasses = 'hover:font-bold pl-2 -mr-2 pr-2'

  if (!checkPrereg(course, index, plan)) {
    return (
      <div
        key={ind}
        className={
          (isAnimateRemove
            ? 'animate__animated animate__bounceOut animate__faster '
            : '') + courseListItemClasses
        }
        ref={drag}
        onClick={handleDropDown}
        onAnimationEnd={() => {
          setIsAnimateRemove(false)
          handleRemove()
        }}>
        <div className="flex">
          <div className="grow">
            <div>
              <span className="font-mono">{course.name}</span>{' '}
              {hints[isDropdownActive ? 1 : 0]}
            </div>
            <div>⚠️Prereq Not Met</div>
          </div>
          <button
            onClick={e => {
              e.stopPropagation()
              setIsAnimateRemove(true)
            }}
            className={removeBtnClasses}>
            -
          </button>
        </div>
        {courseContent}
      </div>
    )
  } else if (checkExclusive(course, index, plan)) {
    return (
      <div
        key={ind}
        className={
          (isAnimateRemove
            ? 'animate__animated animate__bounceOut animate__faster '
            : '') + courseListItemClasses
        }
        ref={drag}
        onClick={handleDropDown}
        onAnimationEnd={() => {
          setIsAnimateRemove(false)
          handleRemove()
        }}>
        <div className="flex">
          <div className="grow">
            <div>
              <span className="font-mono">{course.name}</span>{' '}
              {hints[isDropdownActive ? 1 : 0]}
            </div>
            <div>⚠️MuEx</div>
          </div>
          <button
            onClick={e => {
              e.stopPropagation()
              setIsAnimateRemove(true)
            }}
            className={removeBtnClasses}>
            -
          </button>
        </div>
        {courseContent}
      </div>
    )
  }
  return (
    <div
      key={ind}
      className={
        (isAnimateRemove
          ? 'animate__animated animate__bounceOut animate__faster '
          : '') + courseListItemClasses
      }
      ref={drag}
      onClick={handleDropDown}
      onAnimationEnd={() => {
        setIsAnimateRemove(false)
        handleRemove()
      }}>
      <div className="flex">
        <div className="grow">
          <span className="font-mono">{course.name}</span>{' '}
          {hints[isDropdownActive ? 1 : 0]}
        </div>
        <button
          onClick={e => {
            e.stopPropagation()
            setIsAnimateRemove(true)
          }}
          className={removeBtnClasses}>
          -
        </button>
      </div>
      {courseContent}
    </div>
  )
}

export default SemCourseListItem
