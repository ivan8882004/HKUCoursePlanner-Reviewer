
import { useContext } from "react";
import TableContext from "../../context/SettingsProvider";

function TimeSlot({ time, day, selectedCourseList }) {

    const { setDetail } = useContext(TableContext)

    const getRenderedTimeSlot = (selectedCourseList) => {

        const courses = selectedCourseList;

        const timeslot_hours = [parseInt(time.slice(0, 2)), parseInt(time.slice(6, 8))]

        const filtered_courses = courses.filter((course) => {
            const lecture = course.lectures.find(lecture => {
                const lecture_hours = [parseInt(lecture.time.slice(0, 2)), parseInt(lecture.time.slice(6, 8))];
                return lecture.day === day && timeslot_hours[0] >= lecture_hours[0] && timeslot_hours[1] <= lecture_hours[1];
            });
            return lecture !== undefined;
        });


        if (filtered_courses.length > 1) {

            const conflicted_course = filtered_courses.map((course) => course.courseName).join('/');

            return (
                <div className="TimeSlotConflict" title={conflicted_course}>
                    <p>Courses Conflicted<br></br><span className="details">{conflicted_course}</span></p>
                </div>

            );
        }
        else if (filtered_courses.length === 1) {

            const course = filtered_courses[0];
            const venues = course.lectures.filter((lecture) => {
                const lecture_hours = [parseInt(lecture.time.slice(0, 2)), parseInt(lecture.time.slice(6, 8))];
                return lecture.day === day && timeslot_hours[0] >= lecture_hours[0] && timeslot_hours[1] <= lecture_hours[1];
            }).map((lecture) => lecture.venue).join('/');

            return (
                <div className="TimeSlotFilled" title={course.courseTitle} onClick={() => setDetail(course)}>
                    <p>{course.courseName}<br></br><span className="details">{venues}</span></p>
                </div>
            );

        } else {
            return (
                <div className="TimeSlotEmpty"></div>
            );
        }

    }

    console.log('render');
    return (
        getRenderedTimeSlot(selectedCourseList)

    );
};


export default TimeSlot;