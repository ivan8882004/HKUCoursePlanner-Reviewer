const fs = require('fs')

const jsonData1 = fs.readFileSync('result.json', 'utf8')
const jsonData2 = fs.readFileSync('courseDataSem2.json', 'utf-8')

const data1 = JSON.parse(jsonData1)[1]
const data2 = JSON.parse(jsonData2)

for (let i = 0; i < data1.length; i++) {
  if (data1[i].courseName !== data2[i].courseName) {
    console.log('Your code sucks, name')
    console.log(data1[i], data2[i])
    
  }
  if (data1[i].courseTitle !== data2[i].courseTitle) {
    console.log('Your code sucks, full')
    console.log(data1[i], data2[i])
    
  }

  const map = new Map()

  for (const obj of data1[i].lectures) {
    map.set(JSON.stringify(obj), true)
  }

  let isEqual = true

  for (const obj of data2[i].lectures) {
    if (!map.has(JSON.stringify(obj))) {
      isEqual = false
      break
    }
  }

  if (!isEqual) {
    console.log('Your code sucks, lectures')
    console.log(data1[i], data2[i])
  }
}
