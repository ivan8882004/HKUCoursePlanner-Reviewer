import { useState } from 'react'
import { useSelector } from 'react-redux'
import PreregGraph from '../components/PreregGraph'

function ViewProgramPage() {
  const listItemClasses =
    'py-0.5 pl-2 hover:bg-accent hover:text-white cursor-pointer'

  const [program, setProgram] = useState({
    name: '',
    courseList: [],
  })

  const { degrees, majors, minors } = useSelector(state => {
    return state.programs
  })

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

  const degreesList = degrees.map((item, index) => {
    return (
      <div
        key={index}
        className={
          listItemClasses +
          (program.name === item.name
            ? ' cursor-default bg-accent text-white'
            : '')
        }
        onClick={() => setProgram(item)}>
        {item.name}
      </div>
    )
  })

  const majorsList = majors.map((item, index) => {
    return (
      <div
        key={index}
        className={
          listItemClasses +
          (program.name === item.name
            ? ' cursor-default bg-accent text-white'
            : '')
        }
        onClick={() => setProgram(item)}>
        {item.name}
      </div>
    )
  })

  const minorsList = minors.map((item, index) => {
    return (
      <div
        key={index}
        className={
          listItemClasses +
          (program.name === item.name
            ? ' cursor-default bg-accent text-white'
            : '')
        }
        onClick={() => setProgram(item)}>
        {item.name}
      </div>
    )
  })

  let joinCourseList = []

  for (let i = 0; i < program.courseList.length; i++) {
    for (let j = 0; j < program.courseList[i].courses.length; j++) {
      joinCourseList = [
        ...joinCourseList,
        ...program.courseList[i].courses[j].split('|'),
      ]
    }
  }

  joinCourseList.sort(
    (a, b) => parseInt(a.substring(4)) - parseInt(b.substring(4))
  )

  joinCourseList = [...new Set(joinCourseList)]

  let notFind = []

  let toProcessList = joinCourseList.map(item => {
    if (getCourses(item)?.fullName === undefined) {
      notFind.push(item)
    }
    return {
      name: item,
      fullName: getCourses(item)?.fullName,
      isPrereg: [],
      extraMessage: [],
    }
  })

  let graph

  if (!notFind.length) {
    for (let i = toProcessList.length - 1; i >= 0; i--) {
      let coursePrereg = []
      let placed = false
      const courseDetail = getCourses(toProcessList[i].name)
      for (let j = 0; j < courseDetail.prereg.length; j++) {
        for (let k = 0; k < courseDetail.prereg[j].length; k++) {
          coursePrereg = [
            ...coursePrereg,
            ...courseDetail.prereg[j][k].split('&'),
          ]
        }
      }
      for (let j = 0; j < coursePrereg.length; j++) {
        for (let k = 0; k < toProcessList.length; k++) {
          const name = toProcessList[k].name
          if (coursePrereg[j] === toProcessList[k].name) {
            let extraMessage = []
            for (let ii = 0; ii < courseDetail.prereg.length; ii++) {
              let find = false
              for (let jj = 0; jj < courseDetail.prereg[ii].length; jj++) {
                const index = courseDetail.prereg[ii][jj].indexOf(
                  toProcessList[k].name
                )
                if (index !== -1) {
                  find = true
                }
                if (index !== -1 && courseDetail.prereg[ii][jj].length !== 8) {
                  extraMessage.push(
                    [
                      ...courseDetail.prereg[ii][jj]
                        .split('&')
                        .filter(item => item !== name),
                    ].join(' and ')
                  )
                  break
                }
              }
              if (!find) {
                extraMessage.push([...courseDetail.prereg[ii]].join(' or '))
              }
            }
            toProcessList[k].isPrereg.unshift({
              ...toProcessList[i],
              extraMessage,
            })
            placed = true
          }
        }
      }
      if (placed) {
        toProcessList = [
          ...toProcessList.slice(0, i),
          ...toProcessList.slice(i + 1),
        ]
      }
    }

    graph = toProcessList.map((item, index) => {
      return <PreregGraph listItem={item} key={index} />
    })
  } else {
    graph = notFind.map((item, index) => {
      return <div key={index}>Not Found: {item}</div>
    })
  }

  const listClasses =
    'border-2 border-accent divide-accent font-light divide-y-2 mb-2 transition-transform'

  return (
    <div className="animate__animated animate__fadeIn animate__fast mx-auto flex h-full max-w-[160rem] select-none pb-5 pt-14">
      <div className="ml-5 flex min-w-80 max-w-80 flex-col">
        <div>Degrees</div>
        <div className={listClasses}>{degreesList}</div>
        <div>Majors</div>
        <div className={listClasses}>{majorsList}</div>
        <div>Minors</div>
        <div className={listClasses}>{minorsList}</div>
        {program.name !== '' && (
          <div className="text-end text-xs opacity-50">
            Protip: You can scroll around →
          </div>
        )}
      </div>
      <div className="ml-5 mt-2 w-full min-w-[40rem] border-r-[1.25rem] border-white text-sm">
        <div className="h-full overflow-auto overscroll-y-contain border-2 border-accent">
          {program.name === '' ? (
            <div className="flex h-full items-center justify-center opacity-50">
              Click on a syllabus from the left to view its roadmap
            </div>
          ) : (
            <div className="min-w-fit">{graph}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProgramPage
