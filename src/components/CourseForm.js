import { useState } from "react"
import CourseListForm from "./courseForm/CourseListForm"
import { useDispatch, useSelector } from "react-redux"
import { addCourses, removeCourses } from "../store";

function CourseForm() {
    const dispatch = useDispatch();

    const { courses } = useSelector((state) => {
        return state.courses
    })

    const [course, setCourse] = useState({
        name: "",
        prereg: [],
        isPrereg: [],
        exclusive: [],
        recommendYear: 0,
        credit: 0
    })

    const addCoursePreregList = (value) => {
        setCourse({
            ...course,
            prereg: [...course.prereg, value]
        })
    }

    const removeCoursePreregList = (index) => {
        setCourse({
            ...course,
            prereg: [...course.prereg.slice(0, index), ...course.prereg.slice(index + 1)]
        })
    }

    const editCoursePreregList = (value, index) => {
        let copyPrereg = course.prereg;
        copyPrereg[index] = value;
        setCourse({
            ...course,
            prereg: copyPrereg
        })
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setCourse({
            ...course,
            [name]: value
        })
    }

    const addCourseIsPreregList = (value) => {
        setCourse({
            ...course,
            isPrereg: [...course.isPrereg, value]
        })
    }

    const editCourseIsPreregList = (event, index) => {
        setCourse({
            ...course,
            isPrereg: [...course.isPrereg.slice(0, index), event.target.value, ...course.isPrereg.slice(index + 1)]
        })
    }

    const removeCourseIsPreregList = (index) => {
        setCourse({
            ...course,
            isPrereg: [...course.isPrereg.slice(0, index), ...course.isPrereg.slice(index + 1)]
        })
    }

    const addCourseExclusiveList = (value) => {
        setCourse({
            ...course,
            exclusive: [...course.exclusive, value]
        })
    }

    const editCourseExclusiveList = (event, index) => {
        setCourse({
            ...course,
            exclusive: [...course.exclusive.slice(0, index), event.target.value, ...course.exclusive.slice(index + 1)]
        })
    }

    const removeCourseExclusiveList = (index) => {
        setCourse({
            ...course,
            exclusive: [...course.exclusive.slice(0, index), ...course.exclusive.slice(index + 1)]
        })
    }

    const preregForm = course.prereg.map((list, index) => {
        return (
            <tr key={index}>
                <CourseListForm index={index} list={list} setter={(value) => editCoursePreregList(value, index)} />
                <td>
                    <button type="button" onClick={() => removeCoursePreregList(index)}>Delete List</button>
                </td>
            </tr>
        )
    })

    const isPreregForm = course.isPrereg.map((cour, index) => {
        return (
            <div key={index}>
                <input value={cour} onChange={(event) => editCourseIsPreregList(event, index)} />
                <button type="button" onClick={() => removeCourseIsPreregList(index)}>X</button>
            </div>
        )
    })

    const exclusiveForm = course.exclusive.map((cour, index) => {
        return (
            <div key={index}>
                <input value={cour} onChange={(event) => editCourseExclusiveList(event, index)} />
                <button type="button" onClick={() => removeCourseExclusiveList(index)}>X</button>
            </div>
        )
    })

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const coursesList = courses.map((course, index) => {
        return <div key={index} className="InfoList">
            <span onClick={() => setCourse(course)}>{course.name}</span>
            <button onClick={() => dispatch(removeCourses(index))}>X</button>
        </div>
    })



    return (
        <div className="InfoForm">
            <div className="InfoFormTitle">
                Add/Edit Course:
            </div>
            <div className="InfoFormContent">
                <div className="InfoFormLeft">
                    <div className="InfoFormSubTitle">
                        Courses
                    </div>
                    {coursesList}
                </div>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Course Name:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" name="name" value={course.name} onChange={handleFormChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Pre reg:
                                </td>
                            </tr>
                            {preregForm}
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addCoursePreregList([])}>Add pre-reg list</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Is pre reg:
                                </td>
                                <td>
                                    {isPreregForm}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addCourseIsPreregList("")}>Add Is pre-reg</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Exclusive:
                                </td>
                                <td>
                                    {exclusiveForm}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addCourseExclusiveList("")}>Add exclusive</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Recommend Year:
                                    </label>
                                </td>
                                <td>
                                    <input type="number" name="recommendYear" value={course.recommendYear || ""} onChange={handleFormChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Credit:
                                    </label>
                                </td>
                                <td>
                                    <input type="number" name="credit" value={course.credit || ""} onChange={handleFormChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => dispatch(addCourses(course))}>Submit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default CourseForm;