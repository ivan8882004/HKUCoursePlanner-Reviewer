function readXlsx() {
  const XLSX = require('xlsx')
  const fs = require('fs')

  const sheets = XLSX.readFile('./TT.xlsx')

  const toProcessSheet = sheets.Sheets[sheets.SheetNames[0]]

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

  const pos = {
    CB: 'Chow Yei Ching Building',
    CCT: 'Cheng Yu Tung Tower',
    CJT: 'Jockey Club Tower',
    CRT: 'Run Run Shaw Tower',
    CPD: 'Central Podium Levels, Centennial Campus',
    CYC: 'Chong Yuet Ming Chemistry Building',
    CYP: 'Chong Yuet Ming Physics Building',
    EH: 'Eliot Hall',
    JL: 'James Hsioung Lee Science Building',
    JMSCDMLAB: 'JMSC Digital Media Lab',
    KB: 'Knowles Building',
    KK: 'K.K. Leung Building',
    LE: 'Library Extension',
    MB: 'Main Building',
    MW: 'Meng Wah Complex',
    RHT: 'Rayson Huang Theatre',
    TT: 'T.T. Tsui Building',
    RM: 'Runme Shaw Building',
    RR: 'Run Run Shaw Building',
    TWFINNO: 'Tam Wing Fan Innovation Wing',
    ONLINE: 'online',
    HW: 'Haking Wong Building',
    GH: 'Graduate House',
    WLGH: 'Wang Gungwu Lecture Hall',
    TBA: 'To be announced',
  }

  const notFindList = []

  output[0].forEach(course => {
    course.lectures.forEach(item => {
      let find = false
      Object.entries(pos).forEach(([key, value]) => {
        if (item.venue.substring(0, key.length) === key) {
          find = true
        }
      })
      if (!find) {
        notFindList.push(item.venue)
      }
    })
  })

  output[1].forEach(course => {
    course.lectures.forEach(item => {
      let find = false
      Object.entries(pos).forEach(([key, value]) => {
        if (item.venue.substring(0, key.length) === key) {
          find = true
        }
      })
      if (!find) {
        notFindList.push(item.venue)
      }
    })
  })

  fs.writeFile(
    './courseDataSem2.json',
    JSON.stringify(output[1]),
    err => {
      if (err) {
        console.error('Error writing file:', err)
        return
      }

      console.log('File exported successfully.')
    }
  )
}

readXlsx()
