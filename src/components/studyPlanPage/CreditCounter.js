import { useSelector } from 'react-redux'

//count the total credit taken

function CreditCounter() {
  const { plan } = useSelector(state => {
    return state.studyPlan
  })

  let taken = 0

  plan.forEach(list => {
    list.forEach(course => {
      if (parseInt(course.credit) === 12) {
        taken += 6
      } else {
        taken += parseInt(course.credit)
      }
    })
  })

  return (
    <>
      <div className="font-bold">Overall</div>
      {taken}/288 Credits Planned
    </>
  )
}

export default CreditCounter
