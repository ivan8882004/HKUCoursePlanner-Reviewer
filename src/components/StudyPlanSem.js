import { useDispatch, useSelector } from "react-redux";
import { addPlanItem, removePlanItem } from "../store";
import { useDrop } from "react-dnd";
import { itemTypes } from "../DnDTypes";
import SemCourseListItem from "./SemCourseListItem";

function StudyPlanSem({ list, index }) {
    const dispatch = useDispatch();

    const { courses } = useSelector((state) => {
        return state.courses
    })

    const getCourses = (name) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].name === name) {
                return courses[i]
            }
        }
    }

    const handleDrop = (item) => {
        if (item.index !== index) {
            dispatch(addPlanItem({index, course: getCourses(item.name)}));
            if (item.index !== -1) {
                dispatch(removePlanItem({index: item.index, course: getCourses(item.name)}))
            }
        }
    }

    const [, drop] = useDrop(() => ({
        accept: itemTypes.COURSE,
        drop: item => handleDrop(item),
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