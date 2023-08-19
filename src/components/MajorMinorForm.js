import { useState } from "react"
import CourseList from "./CourseList"
import { useDispatch, useSelector } from "react-redux"
import { addMajors, addMinors, removeMajors, removeMinors } from "../store"

function MajorMinorForm() {
    const dispatch = useDispatch()

    const { majors, minors } = useSelector((state) => {
        return state.programs
    })

    const [major, setMajor] = useState({
        name: "",
        type: "",
        courseList: [],
        doubleCount: []
    })

    const clearForm = () => {
        setMajor({
            name: "",
            type: "",
            courseList: [],
            doubleCount: []
        })
    }

    const handleFormChange = (event) => {
        setMajor({
            ...major,
            [event.target.name]: event.target.value
        })
    }

    const addCourseList = (value) => {
        setMajor({
            ...major,
            courseList: [...major.courseList, value]
        })
    }

    const editCourseList = (value, index) => {
        setMajor({
            ...major,
            courseList: [...major.courseList.slice(0, index), value, ...major.courseList.slice(index + 1)]
        })
    }

    const removeCourseList = (index) => {
        setMajor({
            ...major,
            courseList: [...major.courseList.slice(0, index), ...major.courseList.slice(index + 1)]
        })
    }

    const addDoubleCount = (value) => {
        setMajor({
            ...major,
            doubleCount: [...major.doubleCount, value]
        })
    }

    const editDoubleCount = (event, index) => {
        setMajor({
            ...major,
            doubleCount: [...major.doubleCount.slice(0, index), event.target.value, ...major.doubleCount.slice(index + 1)]
        })
    }

    const removeDoubleCount = (index) => {
        setMajor({
            ...major,
            doubleCount: [...major.doubleCount.slice(0, index), ...major.doubleCount.slice(index + 1)]
        })
    }

    const courseList = major.courseList.map((item, index) => {
        return (
            <CourseList courseList={item} setCourseList={(value) => editCourseList(value, index)} index={index} removeCourseList={() => removeCourseList(index)} key={index} />
        )
    })

    const doubleCount = major.doubleCount.map((item, index) => {
        return (
            <div key={index}>
                <input value={item} onChange={(event) => editDoubleCount(event, index)} />
                <button type="button" onClick={() => removeDoubleCount(index)}>X</button>
            </div>
        )
    })

    const majorsList = majors.map((major, index) => {
        return (
            <div key={index} className="InfoList">
                <span onClick={() => setMajor(major)}>{major.name}</span>
                <button onClick={() => dispatch(removeMajors(index))}>X</button>
            </div>
        )
    })

    const minorsList = minors.map((minor, index) => {
        return (
            <div key={index} className="InfoList">
                <span onClick={() => setMajor(minor)}>{minor.name}</span>
                <button onClick={() => dispatch(removeMinors(index))}>X</button>
            </div>
        )
    })

    const handleSubmit = () => {
        if (major.type === "major") {
            dispatch(addMajors(major))
        } else if (major.type === "minor") {
            dispatch(addMinors(major))
        }
    }

    console.log(major)

    return (
        <div className="InfoForm">
            <div className="InfoFormTitle">
                Add/Edit Major Minor:
            </div>
            <div className="InfoFormContent">
                <div className="InfoFormLeft">
                    <div className="InfoFormSubTitle">
                        Majors
                    </div>
                    {majorsList}
                    <div className="InfoFormSubTitle">
                        Minors
                    </div>
                    {minorsList}
                </div>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Major/Minor Name:
                                </td>
                                <td>
                                    <input value={major.name} name="name" type="text" onChange={(event) => handleFormChange(event)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Type:
                                </td>
                                <td>
                                    <select onChange={(event) => handleFormChange(event)} name="type">
                                        <option value="">--</option>
                                        <option value="major">Major</option>
                                        <option value="minor">Minor</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Add Course List:
                                </td>
                            </tr>
                            {courseList}
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addCourseList({ credit: "", courses: [], type: "" })}>Add Course List</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Double Count:
                                </td>
                                <td>
                                    {doubleCount}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addDoubleCount("")}>Add Double Count</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                                </td>
                                <td>
                                    <button type="button" onClick={clearForm}>Clear Form</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default MajorMinorForm;