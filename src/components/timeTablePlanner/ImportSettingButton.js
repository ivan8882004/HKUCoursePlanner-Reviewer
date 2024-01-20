import { useContext } from 'react'
import TableContext from '../../context/SettingsProvider'
import { useSelector } from 'react-redux'

//set to import which year from study plan

function ImportSettingButton() {
  const { importSetting, setImportSetting } = useContext(TableContext)

  const { plan } = useSelector(state => {
    return state.studyPlan
  })

  const numberOfYear = Math.ceil((plan.length - 1) / 3)

  let content = []

  for (let i = 0; i < numberOfYear; i++) {
    content.push(
      <div
        className={'border-2 border-accent w-7 flex justify-center font-light'+(importSetting === i + 1 ? ' bg-accent text-white' : ' cursor-pointer hover:bg-accent hover:text-white')}
        onClick={() => setImportSetting(i + 1)}
        key={i}>
        Y{i + 1}
      </div>
    )
  }

  return (
    <>
      Select Year to Plan
      <div className="flex space-x-2">{content}</div>
    </>
  )
}

export default ImportSettingButton
