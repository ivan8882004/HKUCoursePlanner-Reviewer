import { useSelector } from 'react-redux'
import searchPlan from '../../functions/searchPlan'
import ProgramChecker from './ProgramChecker'

//this and extend comp for degree

function DegreeChecker({ degree }) {
  const copyDegree = { ...degree, courseList: [...degree.courseList] }

  const { plan } = useSelector(state => state.studyPlan)

  const commonCoreList = {
    credit: degree.ug5cc,
    courses: [],
    type: 'Common Core Courses',
  }

  for (let i = 1; i <= parseInt(degree.ug5cc) / 6; i++) {
    commonCoreList.courses.push('CCXX000' + i)
  }

  copyDegree.courseList.unshift(commonCoreList)

  const lengCourseList = { credit: 0, courses: [], type: 'Language Courses' }

  copyDegree.ug5leng.forEach(element => {
    if (element === 'CAES1000') {
      if (!searchPlan('DSEENG5+', 1, plan)) {
        lengCourseList.courses.push(element)
        lengCourseList.credit += 6
      }
    } else {
      lengCourseList.courses.push(element)
      lengCourseList.credit += 6
    }
  })

  copyDegree.courseList.unshift(lengCourseList)

  return <ProgramChecker program={copyDegree} />
}

export default DegreeChecker
