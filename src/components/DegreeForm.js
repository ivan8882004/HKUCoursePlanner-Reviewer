import { useState } from "react";
import CourseList from "./CourseList";
import FocusForm from "./FocusForm";
import { useDispatch, useSelector } from "react-redux";
import { addDegrees, removeDegrees } from "../store";

function DegreeForm() {
    const dispatch = useDispatch();

    const { degrees } = useSelector((state) => {
        return state.programs
    })

    const [degree, setDegree] = useState({
        name: "",
        ug5cc: 0,
        ug5leng: [],
        courseList: [],
        focus: []
    })

    const clearForm = () => {
        setDegree({
            name: "",
            ug5cc: 0,
            ug5leng: [],
            courseList: [],
            focus: []
        })
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setDegree({
            ...degree,
            [name]: value
        })
    }

    const addLeng = (value) => {
        setDegree({
            ...degree,
            ug5leng: [...degree.ug5leng, value]
        })
    }

    const addCourse = (value) => {
        setDegree({
            ...degree,
            courseList: [...degree.courseList, value]
        })
    }

    const addFocus = (value) => {
        setDegree({
            ...degree,
            focus: [...degree.focus, value]
        })
    }

    const editLeng = (event, index) => {
        let copyLeng = degree.ug5leng;
        copyLeng[index] = event.target.value;
        setDegree({
            ...degree,
            ug5leng: copyLeng
        })
    }

    const editCourseList = (value, index) => {
        setDegree({
            ...degree,
            courseList: [...degree.courseList.slice(0, index), value, ...degree.courseList.slice(index + 1)]
        })
    }

    const editFocus = (value, index) => {
        setDegree({
            ...degree,
            focus: [...degree.focus.slice(0, index), value, ...degree.focus.slice(index + 1)]
        })
    }

    const removeLeng = (index) => {
        setDegree({
            ...degree,
            ug5leng: [...degree.ug5leng.slice(0, index), ...degree.ug5leng.slice(index + 1)]
        })
    }

    const removeCourseList = (index) => {
        setDegree({
            ...degree,
            courseList: [...degree.courseList.slice(0, index), ...degree.courseList.slice(index + 1)]
        })
    }

    const removeFocus = (index) => {
        setDegree({
            ...degree,
            focus: [...degree.focus.slice(0, index), ...degree.focus.slice(index + 1)]
        })
    }

    const lengList = degree.ug5leng.map((cour, index) => {
        return (
            <div key={index} className="InfoList">
                <input value={cour} onChange={(event) => editLeng(event, index)} />
                <button type="button" onClick={() => removeLeng(index)}>X</button>
            </div>
        )
    })

    const coursesForm = degree.courseList.map((item, index) => {
        return (
            <CourseList courseList={item} setCourseList={(value) => { editCourseList(value, index) }} index={index} removeCourseList={() => removeCourseList(index)} key={index} />
        )
    })

    const focusForm = degree.focus.map((item, index) => {
        return (
            <FocusForm focus={item} key={index} index={index} setFocus={(value) => editFocus(value, index)} removeFocus={() => removeFocus(index)} />
        )
    })

    const degreesList = degrees.map((degree, index) => {

        return <div key={index} className="InfoList">
            <span onClick={() => setDegree({ ...degree, ug5leng: [...degree.ug5leng] })}>{degree.name}</span>
            <button onClick={() => dispatch(removeDegrees(index))}>X</button>
        </div>
    })

    return (
        <div className="InfoForm">
            <div className="InfoFormTitle">
                Add/Edit Degree:
            </div>
            <div className="InfoFormContent">
                <div className="InfoFormLeft">
                    <div className="InfoFormSubTitle">
                        Degrees
                    </div>
                    <div>
                        {degreesList}
                    </div>
                </div>
                <form className="InfoFormForm">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>
                                        Degree Name:
                                    </label>
                                </td>
                                <td>
                                    <input type="text" value={degree.name} name="name" onChange={handleFormChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>
                                        Degree CC credit:
                                    </label>
                                </td>
                                <td>
                                    <input type="number" value={degree.ug5cc || ""} name="ug5cc" onChange={handleFormChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Degree Leng courses:
                                </td>
                                <td>
                                    {lengList}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addLeng("")}>Add leng course</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Degree major courses:
                                </td>
                            </tr>
                            {coursesForm}
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addCourse({ credit: "", courses: [], type: "" })}>Add major courses list</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Degree focus:
                                </td>
                            </tr>
                            {focusForm}
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addFocus({ name: "", courseList: [] })}>Add focus</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => dispatch(addDegrees(degree))}>Submit</button>
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

export default DegreeForm;