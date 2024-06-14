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

  const [best8, setBest8] = useState(null)

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
    if (pos === 1) event.target.blur()
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

    if ((engg4 + non_engg4) / 8 !== 0)
      setBest8(((engg4 + non_engg4) / 8).toFixed(2))
    setIsPlayGpaAnimation(true)
  }

  const optionClasses = 'bg-white text-black'

  const [isPlayGpaAnimation, setIsPlayGpaAnimation] = useState(false)

  return (
    <div className="animate__animated animate__fadeIn animate__fast flex select-none flex-col items-center space-y-4 pb-4 pt-20 text-center">
      <div className="w-fit bg-accent px-2 py-1 text-3xl font-bold text-white underline">
        Best-8 Calculator
      </div>
      <p className="w-80 sm:w-[26rem]">
        A calculator for first-year engineering students who are going to choose
        a major with the best-8 GPA.
      </p>
      <div className="flex flex-col space-y-2 max-sm:w-full max-sm:px-2">
        {courses.map((ele, ind) => (
          <div key={ind} className="flex items-center space-x-2">
            <input
              value={ele[0]}
              onChange={event => handleChange(event, ind, 0)}
              placeholder="Enter Course Code"
              className="w-full appearance-none rounded-none border-2 border-accent p-0.5 pl-2 font-mono font-light outline-none placeholder:font-poppins placeholder:text-black hover:bg-accent hover:text-white hover:placeholder:text-white focus:bg-accent focus:text-white placeholder:focus:text-white sm:w-52"
            />
            <div className="w-5">
              {/^[A-Za-z]{4}\d{4}$/.test(ele[0]) || ele[0].length === 0
                ? '➠'
                : '❓'}
            </div>
            <select
              value={ele[1]}
              onChange={event => handleChange(event, ind, 1)}
              className="w-52 cursor-pointer appearance-none rounded-none border-2 border-accent bg-white p-0.5 pl-2 font-light outline-none placeholder:text-black hover:bg-accent hover:text-white hover:placeholder:text-white focus:bg-accent focus:text-white placeholder:focus:text-white">
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
      </div>
      <button
        onClick={handleSubmit}
        className="w-80 cursor-pointer border-2 border-accent p-0.5 text-accent transition-transform hover:bg-accent hover:text-white active:translate-y-1">
        CALCULATE
      </button>

      <div className="flex h-10 items-baseline">
        Your best-8 GPA is...{' '}
        <span
          className={
            'ml-1 bg-accent px-2 font-mono text-2xl font-bold text-white' +
            (best8 && isPlayGpaAnimation
              ? ' animate__animated animate__zoomInUp animate__fast'
              : '')
          }
          onAnimationEnd={() => {
            setIsPlayGpaAnimation(false)
          }}>
          {best8 ? best8 : '????'}
        </span>
      </div>
    </div>
  )
}

export default Best8CalPage
