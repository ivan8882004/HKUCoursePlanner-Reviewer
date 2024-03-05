import { useDispatch, useSelector } from 'react-redux'
import {
  setDegree,
  setMajor,
  setMinor1,
  setMinor2,
  setPlan,
  setStudyPlan,
} from '../store'
import { useState } from 'react'
import StudyPlanSem from '../components/studyPlanPage/StudyPlanSem'
import CourseListItem from '../components/studyPlanPage/CourseListItem'
import DegreeChecker from '../components/studyPlanPage/DegreeChecker'
import StudyPlanCheckBoxs from '../components/studyPlanPage/StudyPlanCheckBoxs'
import searchPlan from '../functions/searchPlan'
import ProgramChecker from '../components/studyPlanPage/ProgramChecker'
import CreditCounter from '../components/studyPlanPage/CreditCounter'

function StudyPlanPage() {
  const inputClasses =
    'rounded-none border-2 border-accent outline-none w-full p-0.5 pl-2 focus:bg-accent hover:bg-accent hover:text-white focus:text-white font-light block appearance-none cursor-pointer mb-2'
  const header1Classes = 'sticky -top-1 px-2 font-bold bg-white z-10'
  const header2Classes = 'sticky top-4 px-2 font-medium backdrop-blur-lg'
  const optionClasses = 'bg-white text-black'

  const dispatch = useDispatch()

  const [searchBar, setSearchBar] = useState('')

  const { plan, degree, major, minor1, minor2 } = useSelector(state => {
    return state.studyPlan
  })

  const { degrees, majors, minors } = useSelector(state => {
    return state.programs
  })

  const { courses } = useSelector(state => {
    return state.courses
  })

  const degreesDropDown = degrees.map((item, index) => {
    return (
      <option
        value={JSON.stringify(item)}
        key={index}
        className={optionClasses}
        selected={item.name === degree.name.replace(/"/g, '')}>
        {item.name}
      </option>
    )
  })

  const majorsDropDown = majors.map((item, index) => {
    return (
      <option
        value={JSON.stringify(item)}
        key={index}
        className={optionClasses}
        selected={item.name === major.name.replace(/"/g, '')}>
        {item.name}
      </option>
    )
  })

  const minorsDropDown = minorId =>
    minors.map((item, index) => {
      return (
        <option
          value={JSON.stringify(item)}
          key={index}
          className={optionClasses}
          selected={
            item.name ===
            (minorId === 1 ? minor1 : minor2).name.replace(/"/g, '')
          }>
          {item.name}
        </option>
      )
    })

  const semList = [...plan.slice(1)].map((list, index) => {
    return <StudyPlanSem index={index + 1} list={list} key={index} />
  })

  let orderedSemList = []

  for (let i = 0; i < semList.length / 3; i++) {
    orderedSemList.push(
      <div key={i} className="flex h-full min-w-40 basis-1/4 flex-col pt-1">
        <div className="px-2 font-bold">Year {i + 1}</div>
        <div className="no-scrollbar flex grow flex-col overflow-scroll overscroll-contain pb-2">
          {[...semList.slice(i * 3, i * 3 + 3)]}
        </div>
      </div>
    )
  }

  const joinCourseList = list => {
    let courseList = []

    list.courses.forEach(element => {
      courseList = [...courseList, ...element.split('|')]
    })

    return courseList
  }

  const createCourseListItem = (list, index) => {
    const renderCourseList = joinCourseList(list).map((item, index) => {
      return (
        <CourseListItem
          name={item}
          index={index}
          searchBar={searchBar}
          key={index}
        />
      )
    })

    return (
      <div key={index}>
        <div className={header2Classes}>
          {list.type} - {list.credit} credits
        </div>
        <div>{renderCourseList}</div>
      </div>
    )
  }

  const degreeCourseLists = degree.courseList.map((list, index) => {
    return createCourseListItem(list, index)
  })

  const majorCourseLists = major.courseList.map((list, index) => {
    return createCourseListItem(list, index)
  })

  const minor1CourseLists = minor1.courseList.map((list, index) => {
    return createCourseListItem(list, index)
  })

  const minor2CourseLists = minor2.courseList.map((list, index) => {
    return createCourseListItem(list, index)
  })

  const toRenderCommonCoreList = []

  for (let i = 1; i <= parseInt(degree.ug5cc) / 6; i++) {
    toRenderCommonCoreList.push('CCXX000' + i)
  }

  const commonCoreList = toRenderCommonCoreList.map((item, index) => {
    return (
      <CourseListItem
        name={item}
        index={index}
        searchBar={searchBar}
        key={index}
      />
    )
  })

  const degreeLengCourseList = degree.ug5leng
    .filter(item =>
      item === 'CAES1000' && searchPlan('DSEENG5+', 1, plan) ? false : true
    )
    .map((item, index) => (
      <CourseListItem
        name={item}
        index={index}
        searchBar={searchBar}
        key={index}
      />
    ))

  const allCourseList = courses.map((item, index) => {
    return (
      <CourseListItem
        name={item.name}
        index={index}
        searchBar={searchBar}
        key={index}
      />
    )
  })

  return (
    <div className="animate-fade-in animate__animated animate__fadeIn animate__fast flex h-full min-w-fit select-none justify-center p-5 pt-14">
      <div className="flex h-full min-w-80 max-w-80 flex-col">
        <div>
          <div>Degree</div>
          <select
            className={inputClasses}
            onChange={event => {
              event.target.blur()
              dispatch(setDegree(JSON.parse(event.target.value)))
            }}>
            <option className={optionClasses} value={JSON.stringify(degree)}>
              Select Degree
            </option>
            {degreesDropDown}
          </select>
        </div>

        <div>
          <div>2nd Major</div>
          <select
            className={inputClasses}
            onChange={event => {
              event.target.blur()
              dispatch(setMajor(JSON.parse(event.target.value)))
            }}>
            <option className={optionClasses} value={JSON.stringify(major)}>
              Select 2nd Major (If Any)
            </option>
            {majorsDropDown}
          </select>
        </div>

        <div>
          <div>Minor 1</div>
          <select
            className={inputClasses}
            onChange={event => {
              event.target.blur()
              dispatch(setMinor1(JSON.parse(event.target.value)))
            }}>
            <option className={optionClasses} value={JSON.stringify(minor1)}>
              Select Minor 1 (If Any)
            </option>
            {minorsDropDown(1)}
          </select>
        </div>

        <div>
          <div>Minor 2</div>
          <select
            className={inputClasses}
            onChange={event => {
              event.target.blur()
              dispatch(setMinor2(JSON.parse(event.target.value)))
            }}>
            <option className={optionClasses} value={JSON.stringify(minor2)}>
              Select Minor 2 (If Any)
            </option>
            {minorsDropDown(2)}
          </select>
        </div>

        <StudyPlanCheckBoxs />

        <div className="mt-0.5 flex justify-between">
          Courses{' '}
          <div className="mb-1 flex items-end text-xs opacity-50">
            ↓ Drag and drop to plan
          </div>
        </div>
        <input
          type="text"
          value={searchBar}
          onChange={event => setSearchBar(event.target.value)}
          placeholder="Search Courses..."
          className="block w-full cursor-text appearance-none rounded-none border-2 border-accent p-0.5 pl-2 font-mono font-light uppercase outline-none placeholder:font-poppins placeholder:normal-case placeholder:text-black hover:bg-accent hover:text-white placeholder:hover:text-white focus:bg-accent focus:text-white placeholder:focus:text-white"
        />
        <div className="no-scrollbar w-full grow overflow-scroll overscroll-contain border-2 border-t-0 border-accent bg-gradient-to-b from-transparent from-90% to-gray-200 bg-clip-padding py-1 text-sm font-light">
          <div>
            <div className={header1Classes}>{degree.name}</div>
            {degree.name !== '' && (
              <>
                <div>
                  <div className={header2Classes}>
                    Language Courses -{' '}
                    {!!searchPlan('DSEENG5+', 1, plan) ? 12 : 18} credits
                  </div>
                  {degreeLengCourseList}
                </div>
                <div>
                  <div className={header2Classes}>
                    Common Core Courses - {degree.ug5cc} credits
                  </div>
                  {commonCoreList}
                </div>
              </>
            )}
            {degreeCourseLists}
          </div>

          <div>
            <div className={header1Classes}>{major.name}</div>
            {majorCourseLists}
          </div>

          <div>
            <div className={header1Classes}>{minor1.name}</div>
            {minor1CourseLists}
          </div>

          <div>
            <div className={header1Classes}>{minor2.name}</div>
            {minor2CourseLists}
          </div>

          <div>
            <div className="sticky -top-1 z-10 px-2 font-bold backdrop-blur-lg">
              All Courses
            </div>
            {allCourseList}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              dispatch(
                setStudyPlan({
                  plan: [[], [], [], [], [], [], [], [], [], [], [], [], []],
                  degree: {
                    name: '',
                    ug5cc: 0,
                    ug5leng: [],
                    courseList: [],
                    focus: [],
                  },
                  major: {
                    name: '',
                    type: '',
                    courseList: [],
                    doubleCount: [],
                  },
                  minor1: {
                    name: '',
                    type: '',
                    courseList: [],
                    doubleCount: [],
                  },
                  minor2: {
                    name: '',
                    type: '',
                    courseList: [],
                    doubleCount: [],
                  },
                })
              )
              setSearchBar('')
            }}
            className="mt-2 w-full border-2 border-accent p-0.5 text-accent outline-none transition-transform hover:bg-accent hover:text-white focus:bg-accent focus:text-white active:translate-y-1">
            RESET ALL
          </button>
          <button
            onClick={() =>
              dispatch(
                setPlan([[], [], [], [], [], [], [], [], [], [], [], [], []])
              )
            }
            className="mt-2 w-full border-2 border-accent p-0.5 text-accent outline-none transition-transform hover:bg-accent hover:text-white focus:bg-accent focus:text-white active:translate-y-1">
            CLEAR PLAN
          </button>
        </div>
      </div>

      <div className="ml-5 mt-2 flex max-w-[60rem] grow divide-x-2 divide-accent border-2 border-accent text-sm">
        {orderedSemList}
      </div>

      <div className="no-scrollbar ml-5 mt-2 flex min-w-80 max-w-80 flex-col overflow-scroll overscroll-contain border-2 border-accent text-sm">
        <div className="-mb-8 grow px-2 py-1">
          {degree.name === '' &&
          major.name === '' &&
          minor1.name === '' &&
          minor2.name === '' ? (
            <div className="mx-5 flex h-full items-center justify-center text-center opacity-50">
              Credit requirement will be displayed here once you select a
              syllabus
            </div>
          ) : (
            <>
              {degree.name !== '' && <DegreeChecker degree={degree} />}
              {major.name !== '' && <ProgramChecker program={major} />}
              {minor1.name !== '' && <ProgramChecker program={minor1} />}
              {minor2.name !== '' && <ProgramChecker program={minor2} />}
            </>
          )}
        </div>
        <div className="sticky bottom-0 border-t-2 border-accent bg-white px-2 py-1">
          <CreditCounter />
        </div>
      </div>
    </div>
  )
}

export default StudyPlanPage
