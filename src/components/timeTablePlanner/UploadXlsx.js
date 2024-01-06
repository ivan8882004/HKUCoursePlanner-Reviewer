import { useContext } from 'react'
import TableContext from '../../context/SettingsProvider'

function UploadXlsx() {
  const XLSX = require('xlsx')

  const { setUploaded } = useContext(TableContext)

  const readXlsx = toProcessSheet => {
    let output = [[], []]

    let toAddIn = null

    let courseName = ''

    let lecture = { day: '', time: '', venue: 'TBA' }

    let fullName = ''

    const searchOutput = () => {
      for (let i = 0; i < output[toAddIn].length; i++) {
        if (output[toAddIn][i].courseName === courseName) {
          return i
        }
      }
      return false
    }

    const toLoop = Object.entries(toProcessSheet)

    for (let i = 0; i < toLoop.length; i++) {
      const [key, value] = toLoop[i]
      if (key.length === 2 && key[1] === '1') {
      } else {
        if (key[0] === 'A') {
          if (value.w[value.w.length - 1] === '1') {
            toAddIn = 0
          } else if (value.w[value.w.length - 1] === '2') {
            toAddIn = 1
          } else {
            toAddIn = null
          }
        } else if (key[0] === 'C') {
          courseName = value.w
        } else if (key[0] === 'D') {
          courseName += '-' + value.w
        } else if ('HIJKLMN'.includes(key[0])) {
          lecture.day += value.w
        } else if (key[0] === 'O') {
          lecture.venue = value.w
        } else if (key[0] === 'P') {
          lecture.time = (value.w.length === 4 ? '0' : '') + value.w
        } else if (key[0] === 'Q') {
          lecture.time += '-' + (value.w.length === 4 ? '0' : '') + value.w
        } else if (key[0] === 'R') {
          fullName = value.w
          if (toAddIn !== null) {
            const indexToAdd = searchOutput()
            if (lecture.day.length === 3) {
              if (indexToAdd !== false) {
                let find = false
                for (
                  let j = 0;
                  j < output[toAddIn][indexToAdd].lectures.length;
                  j++
                ) {
                  if (
                    JSON.stringify(output[toAddIn][indexToAdd].lectures[j]) ===
                    JSON.stringify(lecture)
                  ) {
                    find = true
                    break
                  }
                }
                if (!find) {
                  output[toAddIn][indexToAdd].lectures.push({ ...lecture })
                }
              } else {
                output[toAddIn].push({
                  courseName,
                  courseTitle: fullName,
                  lectures: [{ ...lecture }],
                  isChecked: false,
                })
              }
            } else if (lecture.day.length > 3) {
              const lectures = []
              const days = lecture.day.match(/.{1,3}/g)
              for (let j = 0; j < days.length; j++) {
                lectures.push({ ...lecture, day: days[j] })
              }
              if (indexToAdd !== false) {
                for (let j = 0; j < lectures.length; j++) {
                  let find = false
                  for (
                    let k = 0;
                    k < output[toAddIn][indexToAdd].lectures.length;
                    k++
                  ) {
                    if (
                      JSON.stringify(output[toAddIn][indexToAdd].lectures[k]) ===
                      JSON.stringify(lectures[j])
                    ) {
                      find = true
                      break
                    }
                  }
                  if (!find) {
                    output[toAddIn][indexToAdd].lectures.push({ ...lectures[j] })
                  }
                }
              } else {
                output[toAddIn].push({
                  courseName,
                  courseTitle: fullName,
                  lectures,
                  isChecked: false,
                })
              }
            }
          }
          toAddIn = null
          courseName = ''
          lecture = { day: '', time: '', venue: 'TBA' }
          fullName = ''
        }
      }
    }

    return output
  }

  const handleFileInput = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const toProcessSheet = workbook.Sheets[workbook.SheetNames[0]]
      const result = readXlsx(toProcessSheet)
      localStorage.setItem('timeTable', JSON.stringify(result))
      setUploaded(result)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="uploadXlsx">
      <h4>Upload Time Table (.xlsx)</h4>
      <input type="file" accept=".xlsx" onChange={handleFileInput} />
    </div>
  )
}

export default UploadXlsx
