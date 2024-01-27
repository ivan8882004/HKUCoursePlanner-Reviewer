import { useEffect, useState } from 'react'
import courseDataSem1 from './data/courseDataSem1.json'
import courseDataSem2 from './data/courseDataSem2.json'
import AutoFillFormInfo from './AutoFillFormInfo'

const FORMCONTENT = 'formContent'

function AutoFillForm({ isSemOne, setter }) {
  const [formContent, setFormContent] = useState({
    courseList: [''],
    dayOffScore: 30,
    earlyTime: '8:30',
    earlyScore: -10,
    gapTime: 3,
    gapScore: -10,
  })

  useEffect(() => {
    const storageFormContent = localStorage.getItem(FORMCONTENT)
    if (storageFormContent) {
      setFormContent(JSON.parse(storageFormContent))
    }
  }, [])

  const [possibleList, setPossibleList] = useState([])

  const addCourseList = () => {
    const toSet = {
      ...formContent,
      courseList: [...formContent.courseList, ''],
    }

    setFormContent(toSet)
    localStorage.setItem(FORMCONTENT, JSON.stringify(toSet))
  }

  const editCourseList = (event, index) => {
    const toSet = {
      ...formContent,
      courseList: [
        ...formContent.courseList.slice(0, index),
        event.target.value.toUpperCase(),
        ...formContent.courseList.slice(index + 1),
      ],
    }

    setFormContent(toSet)
    localStorage.setItem(FORMCONTENT, JSON.stringify(toSet))
  }

  const removeCourseList = index => {
    if (formContent.courseList.length > 1) {
      const toSet = {
        ...formContent,
        courseList: [
          ...formContent.courseList.slice(0, index),
          ...formContent.courseList.slice(index + 1),
        ],
      }

      setFormContent(toSet)
      localStorage.setItem(FORMCONTENT, JSON.stringify(toSet))
    }
  }

  const handleFormChange = event => {
    const toSet = {
      ...formContent,
      [event.target.name]: event.target.value,
    }

    setFormContent(toSet)
    localStorage.setItem(FORMCONTENT, JSON.stringify(toSet))
  }

  const courseListForm = formContent.courseList.map((item, index) => {
    return (
      <div key={index} className="group flex">
        <input
          value={item}
          onChange={event => editCourseList(event, index)}
          placeholder="Enter Course Code..."
          className="grow px-2 outline-none placeholder:text-black/50 group-hover:bg-accent group-hover:text-white placeholder:group-hover:text-white"
        />
        <button
          type="button"
          onClick={() => removeCourseList(index)}
          className="px-2 hover:font-bold group-hover:bg-accent group-hover:text-white">
          -
        </button>
      </div>
    )
  })

  const handleSubmit = () => {
    const output = []
    const data = (JSON.parse(localStorage.getItem('timeTable')) || [
      courseDataSem1,
      courseDataSem2,
    ])[isSemOne ? 0 : 1]
    const possibleCourse = formContent.courseList.map(item => {
      let temp = []
      item.split('|').forEach(name => {
        temp = [
          ...temp,
          ...data.filter(course => course.courseName.includes(name)),
        ]
      })
      return temp
    })
    for (const i of possibleCourse) {
      if (i.length === 0) {
        return
      }
    }
    const indexs = possibleCourse.map(() => {
      return 0
    })
    const endPoint = possibleCourse.map(item => item.length - 1)
    const weekToIndex = {
      MON: 0,
      TUE: 1,
      WED: 2,
      THU: 3,
      FRI: 4,
      SAT: 5,
      SUN: 6,
    }
    const timeTable = []
    for (let i = 0; i < 7; i++) {
      const temp = []
      for (let j = 0; j < 15; j++) {
        temp.push(false)
      }
      timeTable.push(temp)
    }
    const addToTable = (course, table) => {
      for (let i = 0; i < course.lectures.length; i++) {
        const [start, end] = course.lectures[i].time.split('-')
        for (
          let j = parseInt(start.split(':')[0]) - 8;
          j < parseInt(end.split(':')[0]) - 8;
          j++
        ) {
          if (
            table[weekToIndex[course.lectures[i].day]][j] &&
            table[weekToIndex[course.lectures[i].day]][j] !== course.courseName
          ) {
            return true
          } else {
            table[weekToIndex[course.lectures[i].day]][j] = course.courseName
          }
        }
      }
      return false
    }
    const getDayOff = table => {
      let dayOff = -2
      for (let i = 0; i < table.length; i++) {
        if (table[i].filter(item => item).length === 0) {
          dayOff++
        }
      }
      console.log(dayOff)
      return dayOff
    }
    const getEarlyTime = (table, time) => {
      let earlyTime = 0
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < parseInt(time.split(':')[0]) - 7; j++) {
          if (table[i][j]) {
            earlyTime++
            break
          }
        }
      }
      console.log(earlyTime)
      return earlyTime
    }
    const getGap = (table, time) => {
      let gap = 0
      for (let i = 0; i < table.length; i++) {
        let startCount = false
        let dayCount = 0
        let tempGapCount = 0
        for (let j = 0; j < table[i].length; j++) {
          if (table[i][j]) {
            startCount = true
            gap += tempGapCount
            tempGapCount = 0
          } else {
            if (startCount) {
              dayCount++
              if (dayCount >= parseInt(time)) {
                tempGapCount++
              }
            }
          }
        }
      }
      console.log(gap)
      return gap
    }
    while (JSON.stringify(endPoint) !== JSON.stringify(indexs)) {
      const courseList = indexs.map((item, index) => {
        return { ...possibleCourse[index][item], isChecked: true }
      })
      const copyTable = JSON.parse(JSON.stringify(timeTable))
      let toAdd = true
      for (let i = 0; i < indexs.length; i++) {
        if (addToTable(courseList[i], copyTable)) {
          toAdd = false
          break
        }
      }
      let score = 0
      if (toAdd) {
        score +=
          getDayOff(copyTable) * parseInt(formContent.dayOffScore) +
          getEarlyTime(copyTable, formContent.earlyTime) *
            parseInt(formContent.earlyScore) +
          getGap(copyTable, formContent.gapTime) *
            parseInt(formContent.gapScore)
        output.push({
          score,
          courseList: JSON.parse(JSON.stringify(courseList)),
        })
      }
      for (let i = indexs.length - 1; i >= 0; i--) {
        indexs[i]++
        if (indexs[i] !== possibleCourse[i].length) {
          break
        } else {
          indexs[i] = 0
        }
      }
    }
    const courseList = indexs.map((item, index) => {
      return { ...possibleCourse[index][item], isChecked: true }
    })
    const copyTable = JSON.parse(JSON.stringify(timeTable))
    let toAdd = true
    for (let i = 0; i < indexs.length; i++) {
      if (addToTable(courseList[i], copyTable)) {
        toAdd = false
        break
      }
    }
    let score = 0
    if (toAdd) {
      score +=
        getDayOff(copyTable) * parseInt(formContent.dayOffScore) +
        getEarlyTime(copyTable, formContent.earlyTime) *
          parseInt(formContent.earlyScore) +
        getGap(copyTable, formContent.gapTime) * parseInt(formContent.gapScore)
      output.push({ score, courseList: JSON.parse(JSON.stringify(courseList)) })
    }
    setPossibleList(output.sort((a, b) => b.score - a.score))
    setter(output[0]?.courseList || [])
  }

  const renderPossibleList = possibleList.map((item, index) => {
    return (
      <div key={index} onClick={() => setter(item.courseList)} className="list">
        List {index + 1}: {item.score}
      </div>
    )
  })

  return (
    <div className="grow border-2 border-accent">
      <div className='flex items-center'>
        <div className="m-1 w-fit bg-accent px-2 font-bold italic text-white">
          Smart Scheduler
        </div>
        <AutoFillFormInfo />
      </div>
      {courseListForm}
      <button
        type="button"
        onClick={addCourseList}
        className="w-full px-2 text-left font-normal text-accent transition-opacity hover:bg-accent hover:text-white active:opacity-25">
        New Course
      </button>

      <div className="px-2 font-medium">
        <label className="mt-2 flex justify-between">
          Day-off Bonus
          <span className="font-light">{formContent.dayOffScore}</span>
        </label>
        <input
          value={formContent.dayOffScore}
          name="dayOffScore"
          type="range"
          min="0"
          max="100"
          onChange={event => handleFormChange(event)}
          className="w-full -translate-y-1 cursor-pointer appearance-none bg-transparent focus:outline-none
          [&::-moz-range-thumb]:h-3
          [&::-moz-range-thumb]:w-3
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-accent
          [&::-moz-range-track]:h-2
          [&::-moz-range-track]:bg-black/10

          [&::-webkit-slider-runnable-track]:h-1
          [&::-webkit-slider-runnable-track]:bg-black/10
          [&::-webkit-slider-thumb]:-mt-1
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-accent"
        />

        <label className="mt-2 flex justify-between">
          "Too Early!" Time
          <input
            value={formContent.earlyTime}
            name="earlyTime"
            type="time"
            onChange={event => handleFormChange(event)}
            className="font-light outline-none"
          />
        </label>
        <label className="-mt-1 flex justify-between">
          ↪ Violation Penalty
          <span className="font-light">{formContent.earlyScore}</span>
        </label>
        <input
          value={formContent.earlyScore}
          name="earlyScore"
          type="range"
          onChange={event => handleFormChange(event)}
          className="w-full -translate-y-1 cursor-pointer appearance-none bg-transparent focus:outline-none
          [&::-moz-range-thumb]:h-3
          [&::-moz-range-thumb]:w-3
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:bg-accent
          [&::-moz-range-track]:h-2
          [&::-moz-range-track]:bg-black/10

          [&::-webkit-slider-runnable-track]:h-1
          [&::-webkit-slider-runnable-track]:bg-black/10
          [&::-webkit-slider-thumb]:-mt-1
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-accent"
        />

        <label className="mt-2 flex justify-between">
          Max Gap Hours:
          <input
            value={formContent.gapTime}
            name="gapTime"
            type="number"
            onChange={event => handleFormChange(event)}
            className="w-7 font-light outline-none"
          />
        </label>
        <label className="flex justify-between">
          ↪ Violation Penalty
          <span className="font-light">{formContent.gapScore}</span>
        </label>
        <input
          value={formContent.gapScore}
          name="gapScore"
          type="range"
          onChange={event => handleFormChange(event)}
          className="w-full -translate-y-1 cursor-pointer appearance-none bg-transparent focus:outline-none
            [&::-moz-range-thumb]:h-3
            [&::-moz-range-thumb]:w-3
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-track]:h-2
            [&::-moz-range-track]:bg-black/10

            [&::-webkit-slider-runnable-track]:h-1
            [&::-webkit-slider-runnable-track]:bg-black/10
            [&::-webkit-slider-thumb]:-mt-1
            [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:bg-accent"
        />
      </div>

      <button type="button" onClick={handleSubmit}>
        Fill
      </button>

      <div className="possibleList">
        <h4>Possible Course List</h4>
        {renderPossibleList}
      </div>
    </div>
  )
}

export default AutoFillForm
