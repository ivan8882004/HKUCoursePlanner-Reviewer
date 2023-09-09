import CourseList from './CourseList'

function FocusForm({ focus, index, setFocus, removeFocus }) {
  const handleFormChange = event => {
    setFocus({
      ...focus,
      [event.target.name]: event.target.value,
    })
  }

  const addCourseList = value => {
    setFocus({
      ...focus,
      courseList: [...focus.courseList, value],
    })
  }

  const editCourseList = (value, index) => {
    setFocus({
      ...focus,
      courseList: [
        ...focus.courseList.slice(0, index),
        value,
        ...focus.courseList.slice(index + 1),
      ],
    })
  }

  const removeCourseList = index => {
    setFocus({
      ...focus,
      courseList: [
        ...focus.courseList.slice(0, index),
        ...focus.courseList.slice(index + 1),
      ],
    })
  }

  const content = focus.courseList.map((courses, subIndex) => {
    return (
      <CourseList
        courseList={courses}
        setCourseList={value => editCourseList(value, subIndex)}
        index={subIndex}
        removeCourseList={() => removeCourseList(subIndex)}
        key={subIndex}
      />
    )
  })

  return (
    <>
      <tr>
        <td>{'Degree focus ' + (index + 1) + ':'}</td>
        <td>
          <input
            type="text"
            name="name"
            value={focus.name}
            onChange={event => handleFormChange(event)}
            placeholder="Focus name"
          />
        </td>
        <td>
          <button type="button" onClick={removeFocus}>
            Remove Focus
          </button>
        </td>
      </tr>
      {content}
      <tr>
        <td>
          <button
            type="button"
            onClick={() =>
              addCourseList({ credit: '', courses: [], type: '' })
            }>
            Add Focus Course List
          </button>
        </td>
      </tr>
    </>
  )
}

export default FocusForm
