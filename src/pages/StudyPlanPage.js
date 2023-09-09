import { useDispatch, useSelector } from 'react-redux'
import { setDegree, setMajor, setMinor1, setMinor2, setPlan } from '../store'
import { useState } from 'react'
import StudyPlanSem from '../components/studyPlanPage/StudyPlanSem'
import CourseListItem from '../components/studyPlanPage/CourseListItem'
import DegreeChecker from '../components/studyPlanPage/DegreeChecker'
import StudyPlanCheckBoxs from '../components/studyPlanPage/StudyPlanCheckBoxs'
import searchPlan from '../functions/searchPlan'
import ProgramChecker from '../components/studyPlanPage/ProgramChecker'
import CreditCounter from '../components/studyPlanPage/CreditCounter'

function StudyPlanPage() {
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
      <option value={JSON.stringify(item)} key={index}>
        {item.name}
      </option>
    )
  })

  const majorsDropDown = majors.map((item, index) => {
    return (
      <option value={JSON.stringify(item)} key={index}>
        {item.name}
      </option>
    )
  })

  const minorsDropDown = minors.map((item, index) => {
    return (
      <option value={JSON.stringify(item)} key={index}>
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
      <div key={i} className="StudyPlanSemBox">
        {[...semList.slice(i * 3, i * 3 + 3)]}
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
        <span className="Subtitle">
          <span>{list.type}</span>
          <span className="SubtitleAnnotate"> {list.credit} credits</span>
        </span>
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
    toRenderCommonCoreList.push('CCxxXXX' + i)
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

  const degreeLengCourseList = degree.ug5leng.map((item, index) => {
    if (item === 'CAES1000') {
      if (searchPlan('DSEENG5+', 1, plan)) {
        return <div key={index}></div>
      }
    }
    return (
      <CourseListItem
        name={item}
        index={index}
        searchBar={searchBar}
        key={index}
      />
    )
  })

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
    <div className="StudyPlanPage">
      <div className="StudyPlanPageLeft">
        <div>
          <div className="DropDownBox">
            <div>Degree</div>
            <div className="DropDown">
              <select
                onChange={event => {
                  dispatch(setDegree(JSON.parse(event.target.value)))
                }}>
                <option value={JSON.stringify(degree)}>--</option>
                {degreesDropDown}
              </select>
            </div>
          </div>
          <div className="DropDownBox">
            <div>Major</div>
            <div className="DropDown">
              <select
                onChange={event => {
                  dispatch(setMajor(JSON.parse(event.target.value)))
                }}>
                <option value={JSON.stringify(major)}>--</option>
                {majorsDropDown}
              </select>
            </div>
          </div>
          <div className="DropDownBox">
            <div>Minor1</div>
            <div className="DropDown">
              <select
                onChange={event => {
                  dispatch(setMinor1(JSON.parse(event.target.value)))
                }}>
                <option value={JSON.stringify(minor1)}>--</option>
                {minorsDropDown}
              </select>
            </div>
          </div>
          <div className="DropDownBox">
            <div>Minor2</div>
            <div className="DropDown">
              <select
                onChange={event => {
                  dispatch(setMinor2(JSON.parse(event.target.value)))
                }}>
                <option value={JSON.stringify(minor2)}>--</option>
                {minorsDropDown}
              </select>
            </div>
          </div>
          <div>
            <StudyPlanCheckBoxs />
          </div>
          <div className="CourseList">
            CourseList
            <div>
              <input
                type="text"
                value={searchBar}
                onChange={event => setSearchBar(event.target.value)}
                placeholder="Search"
                className="InfoFormSearchBar"
              />
            </div>
            <div className="CourseListContent">
              <div>
                <span className="Title">{degree.name}</span>
                <div>
                  <div>
                    <span className="Subtitle">
                      <span>Leng courses</span>
                      <span className="SubtitleAnnotate">
                        {' '}
                        {!!searchPlan('DSEENG5+', 1, plan) ? 12 : 18} credits
                      </span>
                    </span>
                    {degreeLengCourseList}
                  </div>
                  <div>
                    <span className="Subtitle">
                      <span>Common Core</span>
                      <span className="SubtitleAnnotate">
                        {' '}
                        {degree.ug5cc} credits
                      </span>
                    </span>
                    {commonCoreList}
                  </div>
                  {degreeCourseLists}
                </div>
              </div>
              <div>
                <span className="Title">{major.name}</span>
                <div>{majorCourseLists}</div>
              </div>
              <div>
                <span className="Title">{minor1.name}</span>
                <div>{minor1CourseLists}</div>
              </div>
              <div>
                <span className="Title">{minor2.name}</span>
                <div>{minor2CourseLists}</div>
              </div>
              <div>
                <span className="Title">All courses</span>
                <div>{allCourseList}</div>
              </div>
            </div>
          </div>
          <div className="ClearButton">
            <button
              onClick={() =>
                dispatch(
                  setPlan([[], [], [], [], [], [], [], [], [], [], [], [], []])
                )
              }>
              Clear Plan
            </button>
          </div>
        </div>
      </div>
      {orderedSemList}
      <div className="CheckerBox">
        {degree.name !== '' && <DegreeChecker degree={degree} />}
        {major.name !== '' && <ProgramChecker program={major} />}
        {minor1.name !== '' && <ProgramChecker program={minor1} />}
        {minor2.name !== '' && <ProgramChecker program={minor2} />}
        <CreditCounter />
      </div>
    </div>
  )
}

export default StudyPlanPage
