import DayButton from "./DayButton";
import SemButton from "./SemButton";
import { useState, useEffect, useContext } from "react";
import CourseCard from "./CourseCard.js";
import RangeSlider from "./RangeSlider";

function SearchTool({ isSemOne, setIsSemOne, deleteCourse, insertCourse, setCourseList, 
    selectedCourseList, courseList,deleteCourseinLists,
    insertCourseByMouseEnter


}) {

    const [inputText, setInputText] = useState('');

    const handleChange = (event) => {
        setInputText(event.target.value);
    }

    useEffect(() => {
        if ( isSemOne == true) {
        fetch("../data/courseDataSem1.json")
            .then((response) => response.json())
            .then((data) => {
                const searchTerm = inputText.trim().toUpperCase();
                const matchedCourses = data.filter(
                    (course) => course.courseName.includes(searchTerm));
                setCourseList(matchedCourses.slice(0, 200));
            });
        }

        else {
        fetch("../data/courseDataSem2.json")
            .then((response) => response.json())
            .then((data) => {
                const searchTerm = inputText.trim().toUpperCase();
                const matchedCourses = data.filter(
                    (course) => course.courseName.includes(searchTerm));
                setCourseList(matchedCourses.slice(0, 200));
            });    
        }

    }, [inputText, isSemOne]);

    return (
        <div>
            <div>Days shown in Timetable</div>
            <div className="showDays">
                <DayButton day='MON' />
                <DayButton day='TUE' />
                <DayButton day='WED' />
                <DayButton day='THU' />
                <DayButton day='FRI' />
                <DayButton day='SAT' />
                <DayButton day='SUN' />
            </div>
            <div>Time shown in Timetable</div>
            <div className="showSem">
                <RangeSlider />
            </div>
            <div>Semester shown in Timetable</div>
            <SemButton isSemOne={isSemOne} setIsSemOne={setIsSemOne}/>
            <div>
                <div>Enter Course Code to search</div>
                <input
                    type='text' value={inputText} placeholder="Eg. ECON1210-1A"
                    onChange={handleChange}
                />
            </div>
            <h3>Filtered Courses (Top 200 results):</h3>
            <div className="scroll-container">
                <div>
                    {courseList.map((course, index) => (
                        <CourseCard insertCourseByMouseEnter={insertCourseByMouseEnter}
                            isSemOne={isSemOne} deleteCourseinLists={deleteCourseinLists}
                            selectedCourseList={selectedCourseList}
                            key={index} course={course}
                            deleteCourse={deleteCourse} insertCourse={insertCourse}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};



export default SearchTool;