import { useState } from "react"
import { useSelector } from "react-redux";
import PreregGraph from "../components/PreregGraph";

function ViewProgramPage() {
    const [program, setProgram] = useState({
        name: "",
        courseList: []
    });

    const { degrees, majors, minors } = useSelector((state) => {
        return state.programs
    })

    const {courses} = useSelector((state) => {
        return state.courses
    })

    const getCourses = (name) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].name === name) {
                return courses[i]
            }
        }
    }

    const degreesList = degrees.map((item, index) => {
        return (
            <div key={index} className="InfoList">
                <span onClick={() => setProgram(item)}>{item.name}</span>
            </div>
        )
    })

    const majorsList = majors.map((item, index) => {
        return (
            <div key={index} className="InfoList">
                <span onClick={() => setProgram(item)}>{item.name}</span>
            </div>
        )
    })

    const minorsList = minors.map((item, index) => {
        return (
            <div key={index} className="InfoList">
                <span onClick={() => setProgram(item)}>{item.name}</span>
            </div>
        )
    })

    let joinCourseList = [];

    for (let i = 0; i < program.courseList.length; i++){
        for (let j = 0; j < program.courseList[i].courses.length; j++){
            joinCourseList = [...joinCourseList, ...program.courseList[i].courses[j].split("|")]
        }
    }

    joinCourseList.sort((a, b) => parseInt(a.substring(4)) - parseInt(b.substring(4)))

    joinCourseList = [...new Set(joinCourseList)];

    let toProcessList = joinCourseList.map((item) => {
        if (getCourses(item)?.fullName === undefined) {
            console.log(item + "not exist")
        }
        return {name: item, fullName: getCourses(item).fullName, isPrereg: [], extraMessage: []}
    })

    for (let i = toProcessList.length - 1; i >= 0; i--){
        let coursePrereg = [];
        let placed = false;
        const courseDetail = getCourses(toProcessList[i].name);
        for (let j = 0; j < courseDetail.prereg.length; j++){
            for (let k = 0; k < courseDetail.prereg[j].length; k++){
                coursePrereg = [...coursePrereg, ...courseDetail.prereg[j][k].split("&")]
            }
        }
        for (let j = 0; j < coursePrereg.length; j++){
            for (let k = 0; k < toProcessList.length; k++){
                const name = toProcessList[k].name;
                if (coursePrereg[j] === toProcessList[k].name) {
                    let extraMessage = [];
                    for (let ii = 0; ii < courseDetail.prereg.length; ii++){
                        let find = false;
                        for (let jj = 0; jj < courseDetail.prereg[ii].length; jj++){
                            const index = courseDetail.prereg[ii][jj].indexOf(toProcessList[k].name);
                            if (index !== -1){
                                find = true
                            }
                            if (index !== -1 && courseDetail.prereg[ii][jj].length !== 8) {
                                extraMessage.push([...courseDetail.prereg[ii][jj].split("&").filter((item) => item !== name)].join("and"))
                                break;
                            }
                        }
                        if (!find) {
                            extraMessage.push([...courseDetail.prereg[ii]].join("or"))
                        }
                    }
                    toProcessList[k].isPrereg.unshift({...toProcessList[i], extraMessage})
                    placed = true
                }
            }
        } 
        if (placed) {
            toProcessList = [...toProcessList.slice(0, i), ...toProcessList.slice(i + 1)]
        }
    }

    const graph = toProcessList.map((item, index) => {
        return <PreregGraph listItem={item} key={index} />
    })

    return (
        <div className="ViewProgramPage">
            <div className="ViewPageContent">
                <div className="ViewPageLeft">
                    <div className="ViewPageSubTitle">
                        Degrees
                    </div>
                    {degreesList}
                    <div className="ViewPageSubTitle">
                        Majors
                    </div>
                    {majorsList}
                    <div className="ViewPageSubTitle">
                        Minors
                    </div>
                    {minorsList}
                </div>
                <div className="ViewPageRight">
                    {graph}
                </div>
            </div>
        </div>
    )
}

export default ViewProgramPage