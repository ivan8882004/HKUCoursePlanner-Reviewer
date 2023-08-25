import { useDispatch, useSelector } from "react-redux";
import { addPlanItem, removePlanItem, setDegree, setMajor, setMinor1, setMinor2 } from "../store";
import { useEffect, useState } from "react";
import StudyPlanSem from "../components/StudyPlanSem";
import CourseListItem from "../components/CourseListItem";

function StudyPlanPage() {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(false);

    const [searchBar, setSearchBar] = useState("");

    const { plan, degree, major, minor1, minor2 } = useSelector((state) => {
        return state.studyPlan
    })

    const { degrees, majors, minors } = useSelector((state) => {
        return state.programs
    })

    const { courses } = useSelector((state) => {
        return state.courses
    })

    useEffect(() => {
        plan[0].forEach((item) => {
            if (item.name === "M1/M2_2+") {
                setChecked(true)
            } else {
                setChecked(false)
            }
        })
    },)

    const degreesDropDown = degrees.map((item, index) => {
        return (
            <option value={JSON.stringify(item)} key={index}>{item.name}</option>
        )
    })

    const majorsDropDown = majors.map((item, index) => {
        return (
            <option value={JSON.stringify(item)} key={index}>{item.name}</option>
        )
    })

    const minorsDropDown = minors.map((item, index) => {
        return (
            <option value={JSON.stringify(item)} key={index}>{item.name}</option>
        )
    })

    const handleM1M2CheckBoxChange = () => {
        const course = {
            name: "M1/M2_2+",
            fullName: "",
            prereg: [],
            isPrereg: [],
            exclusive: [],
            recommendYear: 0,
            credit: 0
        }

        if (checked) {
            dispatch(removePlanItem({ index: 0, course }))
        } else {
            dispatch(addPlanItem({ index: 0, course }))
        }
        setChecked(!checked)
    }

    const semList = [...plan.slice(1)].map((list, index) => {
        return (
            <StudyPlanSem index={index + 1} list={list} key={index} />
        )
    })

    let orderedSemList = [];

    for (let i = 0; i < semList.length / 2; i++) {
        orderedSemList.push(
            <div key={i} className="StudyPlanSemBox">
                {[...semList.slice(i * 2, i * 2 + 2)]}
            </div>
        )
    }

    const joinCourseList = (list) => {
        let courseList = [];

        list.courses.forEach(element => {
            courseList = [...courseList, ...element.split("|")]
        });

        return courseList;
    }

    const createCourseListItem = (list, index) => {
        const renderCourseList = joinCourseList(list).map((item, index) => {
            return <CourseListItem name={item} index={index} searchBar={searchBar} key={index} />
        })

        return (
            <div key={index}>
                <span className="Subtitle"><span>{list.type}</span><span className="SubtitleAnnotate"> {list.credit} credits</span></span>
                <div>
                    {renderCourseList}
                </div>
            </div>
        )
    }

    const degreeCourseLists = degree.courseList.map((list, index) => {
        return createCourseListItem(list, index)
    })

    const majorCourseLists = major.courseList.map((list, index) => {
        return createCourseListItem(list, index)
    })

    const minor1CourseLists = minor1.courseList.map((list, index) => {
        return createCourseListItem(list, index)
    })

    const minor2CourseLists = minor2.courseList.map((list, index) => {
        return createCourseListItem(list, index)
    })

    const toRenderCommonCoreList = [];

    for (let i = 1; i <= parseInt(degree.ug5cc)/6; i++) {
        toRenderCommonCoreList.push("CCxxXXX" + i)
    }

    const commonCoreList = toRenderCommonCoreList.map((item, index) => {
        return <CourseListItem name={item} index={index} searchBar={searchBar} key={index} />
    })

    const allCourseList = courses.map((item, index) => {
        return <CourseListItem name={item.name} index={index} searchBar={searchBar} key={index} />
    })

    return (
        <div className="StudyPlanPage">
            <div className="StudyPlanPageLeft">
                <div>
                    <div className="DropDownBox">
                        <div>
                            Degree
                        </div>
                        <div className="DropDown">
                            <select onChange={event => { dispatch(setDegree(JSON.parse(event.target.value))) }}>
                                <option value={JSON.stringify(degree)}>--</option>
                                {degreesDropDown}
                            </select>
                        </div>
                    </div>
                    <div className="DropDownBox">
                        <div>
                            Major
                        </div>
                        <div className="DropDown">
                            <select onChange={event => { dispatch(setMajor(JSON.parse(event.target.value))) }}>
                                <option value={JSON.stringify(major)}>--</option>
                                {majorsDropDown}
                            </select>
                        </div>
                    </div>
                    <div className="DropDownBox">
                        <div>
                            Minor1
                        </div>
                        <div className="DropDown">
                            <select onChange={event => { dispatch(setMinor1(JSON.parse(event.target.value))) }}>
                                <option value={JSON.stringify(minor1)}>--</option>
                                {minorsDropDown}
                            </select>
                        </div>
                    </div>
                    <div className="DropDownBox">
                        <div>
                            Minor2
                        </div>
                        <div className="DropDown">
                            <select onChange={event => { dispatch(setMinor2(JSON.parse(event.target.value))) }}>
                                <option value={JSON.stringify(minor2)}>--</option>
                                {minorsDropDown}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>
                            DSE M1 M2 2 or above
                            <input type="checkbox" checked={checked} onChange={handleM1M2CheckBoxChange} />
                        </label>
                    </div>
                    <div className="CourseList">
                        CourseList
                        <div>
                            <input type="text" value={searchBar} onChange={(event) => setSearchBar(event.target.value)} placeholder="Search" className="InfoFormSearchBar" />
                        </div>
                        <div className="CourseListContent">
                            <div>
                                <span className="Title">{degree.name}</span>
                                <div>
                                    {degreeCourseLists}
                                    <div>
                                        <span className="Subtitle"><span>Common Core</span><span className="SubtitleAnnotate"> {degree.ug5cc} credits</span></span>
                                        {commonCoreList}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="Title">{major.name}</span>
                                <div>
                                    {majorCourseLists}
                                </div>
                            </div>
                            <div>
                                <span className="Title">{minor1.name}</span>
                                <div>
                                    {minor1CourseLists}
                                </div>
                            </div>
                            <div>
                                <span className="Title">{minor2.name}</span>
                                <div>
                                    {minor2CourseLists}
                                </div>
                            </div>
                            <div>
                                <span className="Title">All courses</span>
                                <div>
                                    {allCourseList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {orderedSemList}
        </div>
    )
}

export default StudyPlanPage;