function CourseList({courseList, setCourseList, index, removeCourseList}) {
    const content = courseList.courses.map((course, subIndex) => {
        const editCourseList = (event) => {
            setCourseList({
                ...courseList,
                courses: [...courseList.courses.slice(0, subIndex), event.target.value, ...courseList.courses.slice(subIndex + 1)]
            })
        }

        const removeCourseList = (subIndex) => {
            setCourseList({
                ...courseList,
                courses: [...courseList.courses.slice(0, subIndex), ...courseList.courses.slice(subIndex + 1)]
            })
        }

        return (
            <div key={subIndex} className="InfoList">
                <input type="text" value={course} onChange={(event) => editCourseList(event)} placeholder={"Course " + (subIndex + 1)} />
                <button type="button" onClick={() => removeCourseList(subIndex)}>X</button>
            </div>
        )
    })

    const addCourseList = (value) => {
        setCourseList({
            ...courseList,
            courses: [...courseList.courses, value]
        })
    }

    const handleFormChange = (event) => {
        setCourseList({
            ...courseList,
            [event.target.name]: event.target.value
        })
    }

    return (
        <tr key={index}>
            <td>
                {"Courses list " + (index + 1) + ":"}
            </td>
            <td>
                <div>
                    <input type="text" value={courseList.type} name="type" onChange={(event) => handleFormChange(event)} placeholder="Courses type" />
                </div>
                <div>
                    <input type="number" value={courseList.credit} name="credit" onChange={(event) => handleFormChange(event)} placeholder="Total credit" />
                </div>
                {content}
            </td>
            <td>
                <button type="button" onClick={() => addCourseList("")} >Add new course</button>
            </td>
            <td>
                <button type="button" onClick={removeCourseList}>Remove courses list</button>
            </td>
        </tr>
    )
}

export default CourseList;