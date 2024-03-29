import { useContext, useEffect, useState } from 'react'
import Timetable from '../components/timeTablePlanner/Timetable'
import CourseList from '../components/timeTablePlanner/CourseList'
import SearchTool from '../components/timeTablePlanner/SearchTool'
// import UploadXlsx from '../components/timeTablePlanner/UploadXlsx'
import AutoFillForm from '../components/timeTablePlanner/AutoFillForm'
import TableContext from '../context/SettingsProvider'
import CourseDetail from '../components/timeTablePlanner/CourseDetail'

const TIMETABLEISSEMONE = 'timeTableIsSemOne'
const TIMETABLESEM1 = 'timeTableSem1'
const TIMETABLESEM2 = 'timeTableSem2'

const TimeTablePage = () => {
  const { detail } = useContext(TableContext)

  const [isSemOne, setIsSemOneWithoutSave] = useState(true)
  const [courseList, setCourseList] = useState([])

  const [selectedSem1CourseList, setSelectedSem1CourseListWithoutSave] =
    useState([])
  const [selectedSem2CourseList, setSelectedSem2CourseListWithoutSave] =
    useState([])

  const setIsSemOne = value => {
    setIsSemOneWithoutSave(value)
    localStorage.setItem(TIMETABLEISSEMONE, JSON.stringify(value))
  }

  const setSelectedSem1CourseList = value => {
    setSelectedSem1CourseListWithoutSave(value)
    localStorage.setItem(TIMETABLESEM1, JSON.stringify(value))
  }

  const setSelectedSem2CourseList = value => {
    setSelectedSem2CourseListWithoutSave(value)
    localStorage.setItem(TIMETABLESEM2, JSON.stringify(value))
  }

  useEffect(() => {
    const storageIsSemOne = localStorage.getItem(TIMETABLEISSEMONE)
    if (storageIsSemOne) {
      setIsSemOneWithoutSave(JSON.parse(storageIsSemOne))
    }
    const storageSem1 = localStorage.getItem(TIMETABLESEM1)
    if (storageSem1) {
      setSelectedSem1CourseListWithoutSave(JSON.parse(storageSem1))
    }
    const storageSem2 = localStorage.getItem(TIMETABLESEM2)
    if (storageSem2) {
      setSelectedSem2CourseListWithoutSave(JSON.parse(storageSem2))
    }
  }, [])

  let selectedCourseList
  let setSelectedCourseList

  if (isSemOne) {
    selectedCourseList = selectedSem1CourseList
    setSelectedCourseList = setSelectedSem1CourseList
  } else {
    selectedCourseList = selectedSem2CourseList
    setSelectedCourseList = setSelectedSem2CourseList
  }

  const deleteCourse = course_to_be_deleted => {
    const toSet = selectedCourseList.filter(
      course => course.courseName !== course_to_be_deleted.courseName
    )

    setSelectedCourseList(toSet)
  }

  const insertCourse = course_to_be_inserted => {
    const toSet = [
      ...selectedCourseList.filter(
        course => course.courseName !== course_to_be_inserted.courseName
      ),
      { ...course_to_be_inserted, isChecked: true },
    ]

    const toSetCourseList = [
      ...courseList.filter(
        course => course.courseName !== course_to_be_inserted.courseName
      ),
      { ...course_to_be_inserted, isChecked: true },
    ]

    setCourseList(toSetCourseList)
    setSelectedCourseList(toSet)
  }

  const insertCourseByMouseEnter = course_to_be_inserted => {
    const toSet = [
      ...selectedCourseList.filter(course => course.isChecked),
      { ...course_to_be_inserted, isChecked: false },
    ]

    setSelectedCourseList(toSet)
  }

  const deleteCourseinLists = course_to_be_deleted => {
    console.log('delete', course_to_be_deleted.courseName)
    if (
      selectedSem1CourseList.some(
        course => course_to_be_deleted.courseName === course.courseName
      )
    ) {
      const toSet = selectedSem1CourseList.filter(
        course => course.courseName !== course_to_be_deleted.courseName
      )

      setSelectedSem1CourseList(toSet)
    } else {
      const toSet = selectedSem2CourseList.filter(
        course => course.courseName !== course_to_be_deleted.courseName
      )

      setSelectedSem2CourseList(toSet)
    }
  }

  let detailContent = (
    <div className="mb-5 h-1/3 border-2 border-accent">
      <div className="flex h-full items-center justify-center px-5 text-center font-normal opacity-50">
        Course details will be displayed here once you hover or click on a
        course
      </div>
    </div>
  )

  if (detail) {
    detailContent = <CourseDetail course={detail} />
  }

  return (
    <div className="animate__animated animate__fadeIn animate__fast flex h-full min-w-fit select-none justify-center p-5 pt-14">
      <SearchTool
        deleteCourse={deleteCourse}
        insertCourse={insertCourse}
        courseList={courseList}
        setCourseList={setCourseList}
        setIsSemOne={setIsSemOne}
        isSemOne={isSemOne}
        selectedCourseList={selectedCourseList}
        deleteCourseinLists={deleteCourseinLists}
        insertCourseByMouseEnter={insertCourseByMouseEnter}
      />

      <Timetable selectedCourseList={selectedCourseList} />

      <div className="no-scrollbar ml-5 mt-2 flex min-w-80 max-w-80 flex-col text-sm font-light">
        {detailContent}
        {/* <CourseList
          selectedSem1CourseList={selectedSem1CourseList}
          selectedSem2CourseList={selectedSem2CourseList}
          deleteCourse={deleteCourse}
          deleteCourseinLists={deleteCourseinLists}
        /> */}
        <AutoFillForm
          isSemOne={isSemOne}
          setter={
            isSemOne ? setSelectedSem1CourseList : setSelectedSem2CourseList
          }
        />
      </div>
    </div>
  )
}

export default TimeTablePage
