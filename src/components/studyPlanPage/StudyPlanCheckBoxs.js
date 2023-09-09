import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlanItem, removePlanItem } from '../../store'
import searchPlan from '../../functions/searchPlan'

function StudyPlanCheckBoxs() {
  const dispatch = useDispatch()

  const { plan } = useSelector(state => state.studyPlan)

  const [checked, setChecked] = useState({
    'M1/M2_2+': !!searchPlan('M1/M2_2+', 1, plan),
    'DSEENG5+': !!searchPlan('DSEENG5+', 1, plan),
  })

  useEffect(() => {
    setChecked({
      'M1/M2_2+': !!searchPlan('M1/M2_2+', 1, plan),
      'DSEENG5+': !!searchPlan('DSEENG5+', 1, plan),
    })
  }, [plan])

  const handleCheckBoxChange = event => {
    const course = {
      name: event.target.name,
      fullName: '',
      prereg: [],
      isPrereg: [],
      exclusive: [],
      recommendYear: 0,
      credit: 0,
    }

    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    })
    if (event.target.checked) {
      dispatch(addPlanItem({ index: 0, course }))
    } else {
      dispatch(removePlanItem({ index: 0, course }))
    }
  }

  return (
    <div>
      <div>
        <label>
          DSE M1/M2 level 2 or above
          <input
            type="checkbox"
            name="M1/M2_2+"
            checked={checked['M1/M2_2+']}
            onChange={handleCheckBoxChange}
          />
        </label>
      </div>
      <div>
        <label>
          DSE English level 5 or above
          <input
            type="checkbox"
            name="DSEENG5+"
            checked={checked['DSEENG5+']}
            onChange={handleCheckBoxChange}
          />
        </label>
      </div>
    </div>
  )
}

export default StudyPlanCheckBoxs
