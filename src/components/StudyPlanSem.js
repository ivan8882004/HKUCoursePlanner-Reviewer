import { useDispatch, useSelector } from "react-redux";
import { removePlanItem } from "../store";

function StudyPlanSem({ list, index }) {
    const dispatch = useDispatch();

    const { plan } = useSelector((state) => {
        return state.studyPlan;
    })

    const searchPlan = (name, index) => {
        const toSearch = [...plan.slice(0, index)]

        for (let i = 0; i < toSearch.length; i++) {
            for (let j = 0; j < toSearch[i].length; j++) {
                if (toSearch[i][j].name === name) {
                    return true
                }
            }
        }
        return false
    }

    const checkPrereg = (course) => {
        for (let i = 0; i < course.prereg.length; i++) {
            let notFind = true;
            for (let j = 0; j < course.prereg[i].length; j++) {
                let toCheck;
                let indexToCheck
                if (course.prereg[i][j][0] === "e") {
                    toCheck = course.prereg[i][j].subString(1)
                    indexToCheck = index + 1
                } else {
                    toCheck = course.prereg[i][j]
                    indexToCheck = index
                }
                const toProcessList = toCheck.split("&");
                console.log(toProcessList)
                let checker = 0;
                for (let k = 0; k < toProcessList.length; k++) {
                    checker += searchPlan(toProcessList[k], indexToCheck);
                }
                if (checker === toProcessList.length) {
                    notFind = false;
                    break;
                }
            }
            if (notFind) {
                return false;
            }
        }
        return true;
    }

    const checkExclusive = (course) => {
        for (let i = 0; i < course.exclusive.length; i++) {
            if (searchPlan(course.exclusive[i], index + 1)) {
                return true;
            }
        }
        return false
    }

    const courses = list.map((course, ind) => {
        if (!checkPrereg(course)) {
            return (
                <div key={ind} className="CoursePreregFail">
                    <div className="ErrorMessage">Prereg not filfull</div>
                    {course.name}
                    <button onClick={() => dispatch(removePlanItem({ index: index, course }))}>X</button>
                </div>
            )
        } else if (checkExclusive(course)) {
            return (
                <div key={ind} className="CourseExclusive">
                    <div className="ErrorMessage">Have exclusive</div>
                    {course.name}
                    <button onClick={() => dispatch(removePlanItem({ index: index, course }))}>X</button>
                </div>
            )
        }
        return (
            <div key={ind} className="NormalCourse">
                {course.name}
                <button onClick={() => dispatch(removePlanItem({ index: index, course }))}>X</button>
            </div>
        )
    })

    return (
        <div className="StudyPlanSem">
            <div className="Title">
                Year {Math.floor((index + 1) / 2)} Sem {(index + 1) % 2 + 1}
            </div>
            <div className="Courses">
                {courses}
            </div>
        </div>
    )
}

export default StudyPlanSem;