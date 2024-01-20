import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlanItem, removePlanItem } from '../../store'
import searchPlan from '../../functions/searchPlan'

//check box for dse pre reg, todo: add for more condition such as m1/m2 >= 5 for sci

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
    event.target.blur()

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

  const labelClasses =
    'flex items-center focus-within:underline select-none w-fit decoration-accent decoration-2 cursor-pointer'
  const checkboxClasses =
    'ml-1 mr-2 outline-none appearance-none border-2 border-accent w-4 h-4 checked:bg-accent transition-colors cursor-pointer'

  return (
    <div>
      <label className={labelClasses}>
        <input
          type="checkbox"
          name="M1/M2_2+"
          checked={checked['M1/M2_2+']}
          onChange={handleCheckBoxChange}
          className={checkboxClasses}
        />
        DSE M1/M2 {'>'}= Lv2
      </label>

      <label className={labelClasses}>
        <input
          type="checkbox"
          name="DSEENG5+"
          checked={checked['DSEENG5+']}
          onChange={handleCheckBoxChange}
          className={checkboxClasses}
        />
        DSE English {'>'}= Lv5
      </label>
    </div>
  )
}

export default StudyPlanCheckBoxs
