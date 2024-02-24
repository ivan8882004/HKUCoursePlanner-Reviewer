import SemButton from './SemButton'
import { useState, useEffect, useCallback, useContext } from 'react'
import CourseCard from './CourseCard.js'
import ImportSettingButton from './ImportSettingButton'
import TableContext from '../../context/SettingsProvider'
import { useSelector } from 'react-redux'
import courseDataSem1 from './data/courseDataSem1.json'
import courseDataSem2 from './data/courseDataSem2.json'

function SearchTool({
  isSemOne,
  setIsSemOne,
  deleteCourse,
  insertCourse,
  setCourseList,
  selectedCourseList,
  courseList,
  deleteCourseinLists,
  insertCourseByMouseEnter,
}) {
  const { importSetting, uploaded } = useContext(TableContext)

  const [inputText, setInputText] = useState('')

  const [importCourseList, setImportCourseList] = useState([])

  const { plan } = useSelector(state => state.studyPlan)

  const handleChange = event => {
    setInputText(event.target.value)
    selectedCourseList.forEach(course => {
      if (!course.isChecked) {
        deleteCourse(course)
      }
    })
  }

  const handleCourseListChange = useCallback(
    (list, list2) => {
      setCourseList(list)
      setImportCourseList(list2)
    },
    [setCourseList, setImportCourseList]
  )

  useEffect(() => {
    const toLoadData = async () => {
      let data = JSON.parse(localStorage.getItem('timeTable')) || uploaded
      if (!data) {
        data = [courseDataSem1, courseDataSem2]
        console.log(data, 'load from file')
      }
      if (isSemOne && data) {
        const searchTerm = inputText.trim().toUpperCase()
        const matchedCourses = data[0].filter(course =>
          course.courseName.includes(searchTerm)
        )
        const indexToImport = (parseInt(importSetting) - 1) * 3 + 1
        const importedList = plan[indexToImport].map(item => {
          return item.name
        })
        const temp = []
        data[0].forEach(element => {
          importedList.forEach(name => {
            if (
              element.courseName.includes(name) &&
              element.courseName.includes(searchTerm)
            ) {
              temp.push(element)
            }
          })
        })
        handleCourseListChange(matchedCourses.slice(0, 200), temp)
      } else if (data) {
        const searchTerm = inputText.trim().toUpperCase()
        const matchedCourses = data[1].filter(course =>
          course.courseName.includes(searchTerm)
        )
        const indexToImport = (parseInt(importSetting) - 1) * 3 + 2
        const importedList = plan[indexToImport].map(item => {
          return item.name
        })
        const temp = []
        data[1].forEach(element => {
          importedList.forEach(name => {
            if (
              element.courseName.includes(name) &&
              element.courseName.includes(searchTerm)
            ) {
              temp.push(element)
            }
          })
        })
        handleCourseListChange(matchedCourses.slice(0, 200), temp)
      }
    }
    toLoadData()
  }, [
    inputText,
    isSemOne,
    handleCourseListChange,
    plan,
    importSetting,
    uploaded,
  ])

  console.log(selectedCourseList)

  const headerClasses = 'sticky -top-1 px-2 font-bold backdrop-blur-lg z-10'

  return (
    <div className="flex h-full min-w-80 max-w-80 flex-col">
      {/* <ImportSettingButton /> */}

      <div>Semester</div>
      <SemButton isSemOne={isSemOne} setIsSemOne={setIsSemOne} />

      <div>Courses</div>
      <input
        type="text"
        value={inputText}
        placeholder="Search Courses..."
        onChange={handleChange}
        className="block w-full cursor-text appearance-none rounded-none border-2 border-accent p-0.5 pl-2 font-light outline-none placeholder:text-black hover:bg-accent hover:text-white placeholder:hover:text-white focus:bg-accent focus:text-white placeholder:focus:text-white"
      />
      <div className="no-scrollbar w-full grow overflow-scroll overscroll-contain border-2 border-t-0 border-accent bg-gradient-to-b from-transparent from-90% to-gray-200 bg-clip-padding py-1 text-sm font-light">
        {!!selectedCourseList.filter(course => course.isChecked).length && (
          <div>
            <div className={headerClasses}>Added</div>
            <div className="divide-y-2 divide-accent">
              {selectedCourseList
                .filter(course => course.isChecked)
                .map((course, index) => (
                  <CourseCard
                    insertCourseByMouseEnter={insertCourseByMouseEnter}
                    isSemOne={isSemOne}
                    deleteCourseinLists={deleteCourseinLists}
                    selectedCourseList={selectedCourseList}
                    key={index}
                    course={course}
                    index={index}
                    deleteCourse={deleteCourse}
                    insertCourse={insertCourse}
                  />
                ))}
            </div>
          </div>
        )}
        {/* {!!importCourseList.length && (
          <div>
            <div className={headerClasses}>From Course Planner</div>
            <div className="divide-y-2 divide-accent">
              {importCourseList.map((course, index) => (
                <CourseCard
                  insertCourseByMouseEnter={insertCourseByMouseEnter}
                  isSemOne={isSemOne}
                  deleteCourseinLists={deleteCourseinLists}
                  selectedCourseList={selectedCourseList}
                  key={index}
                  course={course}
                  index={index}
                  deleteCourse={deleteCourse}
                  insertCourse={insertCourse}
                />
              ))}
            </div>
          </div>
        )} */}
        <div>
          <div className={headerClasses}>All Courses</div>
          <div className="divide-y-2 divide-accent">
            {courseList
              .filter(course => !course.isChecked)
              .map((course, index) => (
                <CourseCard
                  insertCourseByMouseEnter={insertCourseByMouseEnter}
                  isSemOne={isSemOne}
                  deleteCourseinLists={deleteCourseinLists}
                  selectedCourseList={selectedCourseList}
                  key={index}
                  course={course}
                  index={index}
                  deleteCourse={deleteCourse}
                  insertCourse={insertCourse}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchTool
