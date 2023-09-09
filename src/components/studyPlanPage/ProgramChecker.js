import { useSelector } from 'react-redux'
import searchPlan from '../../functions/searchPlan'

//check how many credit user have taken in each course list, bug? will double count if a course show up in more than one course list. i.e. DS&E with major/minor stat
//so 9 hard to fix, need to design a new algo, ivan and ken add oil

function ProgramChecker({ program }) {
  const { plan } = useSelector(state => {
    return state.studyPlan
  })

  const courseListResult = program.courseList.map((item, index) => {
    let takenCredits = 0
    item.courses.forEach(element => {
      const toCheck = element.split('|')
      for (let i = 0; i < toCheck.length; i++) {
        const foundCourse = searchPlan(toCheck[i], plan.length, plan)
        if (foundCourse) {
          takenCredits += parseInt(foundCourse.credit)
          break
        }
      }
    })

    return (
      <div key={index}>
        {item.type}
        <div>
          {takenCredits}/{item.credit}
        </div>
      </div>
    )
  })

  return (
    <div className="ProgramChecker">
      {program.name}
      {courseListResult}
    </div>
  )
}

export default ProgramChecker
