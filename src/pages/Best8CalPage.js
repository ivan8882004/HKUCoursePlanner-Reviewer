import { useState } from 'react'

function Best8CalPage() {
  const [courses, setCourses] = useState([
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
  ])

  const [best8, setBest8] = useState(0)

  const grade = {
    'A+': 4.3,
    A: 4,
    'A-': 3.7,
    'B+': 3.3,
    B: 3,
    'B-': 2.7,
    'C+': 2.3,
    C: 2,
    'C-': 1.7,
    'D+': 1.3,
    D: 1,
  }

  const enggCourse = {
    ENGG1300: true,
    ENGG1310: true,
    ENGG1320: true,
    ENGG1330: true,
    ENGG1340: true,
    ENGG1350: true,
    MATH1851: true,
    MATH1853: true,
  }

  const handleChange = (event, ind, pos) => {
    const temp = courses[ind]
    temp[pos] = event.target.value.toUpperCase()
    const temp2 = JSON.parse(JSON.stringify(courses))
    temp2[ind] = temp
    setCourses(temp2)
  }

  const handleSubmit = () => {
    const counted = {}

    courses.forEach(ele => {
      if (!/^[A-Za-z]{4}\d{4}$/.test(ele[0]) || !(ele[1] in grade)) return

      if (
        ele[0].length !== ele[1].length &&
        (ele[0].length === 0 || ele[1].length === 0)
      )
        return
    })

    const sortedCourse = courses
      .sort((a, b) => grade[b[1]] - grade[a[1]])
      .filter(ele => ele[0].length + ele[1].length)

    let engg4 = 0

    let counter = 0

    sortedCourse.forEach(ele => {
      if (ele[0] in enggCourse && counter < 4) {
        engg4 += grade[ele[1]]
        counted[ele[0]] = true
        counter++
      }
    })

    let non_engg4 = 0

    counter = 0

    sortedCourse.forEach(ele => {
      if (!(ele[0] in counted) && counter < 4) {
        non_engg4 += grade[ele[1]]
        counted[ele[0]] = true
        counter++
      }
    })

    setBest8((engg4 + non_engg4) / 8)
  }

  const inputClasses =
    'rounded-none border-2 border-accent outline-none w-full p-0.5 pl-2 focus:bg-accent hover:bg-accent hover:text-white focus:text-white font-light block appearance-none cursor-pointer mb-2'
  const optionClasses = 'bg-white text-black'

  return (
    <div>
      {courses.map((ele, ind) => (
        <div key={ind}>
          <input
            value={ele[0]}
            onChange={event => handleChange(event, ind, 0)}
            className={
              inputClasses +
              (/^[A-Za-z]{4}\d{4}$/.test(ele[0]) || ele[0].length === 0
                ? ''
                : ' border-red-600')
            }
          />
          <select
            value={ele[1]}
            onChange={event => handleChange(event, ind, 1)}
            className={inputClasses}>
            <option className={optionClasses}>Select Grade</option>
            <option className={optionClasses} value="A+">
              A+
            </option>
            <option className={optionClasses} value="A">
              A
            </option>
            <option className={optionClasses} value="A-">
              A-
            </option>
            <option className={optionClasses} value="B+">
              B+
            </option>
            <option className={optionClasses} value="B">
              B
            </option>
            <option className={optionClasses} value="B-">
              B-
            </option>
            <option className={optionClasses} value="C+">
              C+
            </option>
            <option className={optionClasses} value="C">
              C
            </option>
            <option className={optionClasses} value="C-">
              C-
            </option>
            <option className={optionClasses} value="D+">
              D+
            </option>
            <option className={optionClasses} value="D">
              D
            </option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <div>Best 8: {best8}</div>
    </div>
  )
}

export default Best8CalPage
