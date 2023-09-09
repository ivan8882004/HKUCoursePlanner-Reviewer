import { createContext, useEffect, useState } from 'react'

const TIMETABLESETTINGHOUR = 'timeTableSettingHour'
const TIMETABLESETTINGIMPORTSETTING = 'timeTableSettingImportSetting'
const TIMETABLESETTINGDAYS = 'timeTableSettingDays'

const TableContext = createContext()

function TimeTableProvider({ children }) {
  const [detail, setDetail] = useState(null)

  const [hour, setHourWithoutSave] = useState([8, 19])

  const [uploaded, setUploaded] = useState(null)

  const [importSetting, setImportSettingWithoutSave] = useState(1)

  const [days, setDaysWithoutSave] = useState(
    new Map([
      ['MON', true],
      ['TUE', true],
      ['WED', true],
      ['THU', true],
      ['FRI', true],
      ['SAT', false],
      ['SUN', false],
    ])
  )

  useEffect(() => {
    const storageHour = localStorage.getItem(TIMETABLESETTINGHOUR)
    if (storageHour) {
      setHourWithoutSave(JSON.parse(storageHour))
    }
    const storageImportSetting = localStorage.getItem(
      TIMETABLESETTINGIMPORTSETTING
    )
    if (storageImportSetting) {
      setImportSettingWithoutSave(parseInt(JSON.parse(storageImportSetting)))
    }
    const storageDays = localStorage.getItem(TIMETABLESETTINGDAYS)
    if (storageDays) {
      setDaysWithoutSave(new Map(Object.entries(JSON.parse(storageDays))))
    }
  }, [])

  const setHour = value => {
    setHourWithoutSave(value)
    localStorage.setItem(TIMETABLESETTINGHOUR, JSON.stringify(value))
  }

  const setImportSetting = value => {
    setImportSettingWithoutSave(value)
    localStorage.setItem(TIMETABLESETTINGIMPORTSETTING, JSON.stringify(value))
  }

  const setDays = value => {
    setDaysWithoutSave(value)
    const daysAsObj = Object.fromEntries(value.entries())
    localStorage.setItem(TIMETABLESETTINGDAYS, JSON.stringify(daysAsObj))
  }

  const add_drop_day = day => {
    const updatedDays = new Map(days)
    updatedDays.set(day, !updatedDays.get(day))
    setDays(updatedDays)
  }

  const valueToShare = {
    hour,
    setHour,
    days,
    add_drop_day,
    importSetting,
    setImportSetting,
    detail,
    setDetail,
    uploaded,
    setUploaded,
  }

  return (
    <TableContext.Provider value={valueToShare}>
      {children}
    </TableContext.Provider>
  )
}

export { TimeTableProvider }

export default TableContext
