import { useDispatch, useSelector } from "react-redux";
import { addPlanFyp, addPlanItem, removePlanFyp, removePlanItem } from "../store";
import { useDrop } from "react-dnd";
import { itemTypes } from "../DnDTypes";
import SemCourseListItem from "./SemCourseListItem";
import { useEffect, useRef } from "react";
import getCourses from "../functions/getCourses";

function StudyPlanSem({ list, index }) {
    const dispatch = useDispatch();

    const { courses } = useSelector((state) => {
        return state.courses
    })

    const handleDrop = useRef(null);

    useEffect(() => {
        handleDrop.current = (item) => {
            const course = getCourses(item.name, courses)
            if (parseInt(course.credit) === 6) {
                if (item.index !== index) {
                    dispatch(addPlanItem({index, course}));
                    if (item.index !== -1) {
                        dispatch(removePlanItem({index: item.index, course}))
                    }
                }
            } else if (parseInt(course.credit) === 12) {
                console.log("FYP")
                if ((index - (1 - index%2) !== item.index && (index - (1 - index%2) + 1 !== item.index))) {
                    dispatch(addPlanFyp({index, course}));
                    if (item.index !== -1) {
                        dispatch(removePlanFyp({index: item.index, course}))
                    }
                }
            }
            
        }
    }, [courses, dispatch, index])

    const [, drop] = useDrop(() => ({
        accept: itemTypes.COURSE,
        drop: item => handleDrop.current(item),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }))

    const courseList = list.map((course, ind) => {
        return <SemCourseListItem course={course} ind={ind} index={index} key={ind} />
    })

    return (
        <div className="StudyPlanSem" ref={drop}>
            <div className="Title">
                Year {Math.floor((index + 1) / 2)} Sem {(index + 1) % 2 + 1}
            </div>
            <div className="Courses">
                {courseList}
            </div>
        </div>
    )
}

export default StudyPlanSem;