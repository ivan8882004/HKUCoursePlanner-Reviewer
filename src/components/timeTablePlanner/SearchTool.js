import SemButton from "./SemButton";
import { useState, useEffect, useCallback, useContext } from "react";
import CourseCard from "./CourseCard.js";
import ImportSettingButton from "./ImportSettingButton";
import TableContext from "../../context/SettingsProvider";
import { useSelector } from "react-redux";

function SearchTool({ isSemOne, setIsSemOne, deleteCourse, insertCourse, setCourseList,
    selectedCourseList, courseList, deleteCourseinLists,
    insertCourseByMouseEnter


}) {

    const { importSetting } = useContext(TableContext)

    const [inputText, setInputText] = useState('');

    const [importCourseList, setImportCourseList] = useState([]);

    const { plan } = useSelector(state => state.studyPlan)

    const handleChange = (event) => {
        setInputText(event.target.value);
        selectedCourseList.forEach((course) => {
            if (!course.isChecked) {
                deleteCourse(course)
            }
        })
    }

    const handleCourseListChange = useCallback((list, list2) => {
        setCourseList(list)
        setImportCourseList(list2)
    }, [setCourseList, setImportCourseList])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("timeTable"))
        if (isSemOne) {
            const searchTerm = inputText.trim().toUpperCase();
            const matchedCourses = data[0].filter(
                (course) => course.courseName.includes(searchTerm));
            const indexToImport = (parseInt(importSetting) - 1) * 3 + 1;
            const importedList = plan[indexToImport].map((item) => {
                return item.name
            })
            const temp = [];
            data[0].forEach(element => {
                importedList.forEach(name => {
                    if (element.courseName.includes(name) && element.courseName.includes(searchTerm)) {
                        temp.push(element)
                    }
                })
            });
            handleCourseListChange(matchedCourses.slice(0, 200), temp)
        } else {
            const searchTerm = inputText.trim().toUpperCase();
            const matchedCourses = data[1].filter(
                (course) => course.courseName.includes(searchTerm));
            const indexToImport = (parseInt(importSetting) - 1) * 3 + 2;
            const importedList = plan[indexToImport].map((item) => {
                return item.name
            })
            const temp = [];
            data[1].forEach(element => {
                importedList.forEach(name => {
                    if (element.courseName.includes(name) && element.courseName.includes(searchTerm)) {
                        temp.push(element)
                    }
                })
            });
            handleCourseListChange(matchedCourses.slice(0, 200), temp)
        }

    }, [inputText, isSemOne, handleCourseListChange, plan, importSetting]);

    console.log(selectedCourseList)

    return (
        <div>
            <ImportSettingButton />
            <div>Semester shown in Timetable</div>
            <SemButton isSemOne={isSemOne} setIsSemOne={setIsSemOne} />
            <div className="scroll-box">
                <h4>Filtered Courses (Top 200 results):</h4>
                <div>
                    <div>Enter Course Code to search</div>
                    <input
                        type='text' value={inputText} placeholder="Eg. ECON1210-1A"
                        onChange={handleChange}
                    />
                </div>
                <div className="scroll-container">
                    {!!importCourseList.length && <>
                        <div>
                            Selected course
                        </div>
                        <div>
                            {importCourseList.map((course, index) => (
                                <CourseCard insertCourseByMouseEnter={insertCourseByMouseEnter}
                                    isSemOne={isSemOne} deleteCourseinLists={deleteCourseinLists}
                                    selectedCourseList={selectedCourseList}
                                    key={index} course={course} index={index}
                                    deleteCourse={deleteCourse} insertCourse={insertCourse}
                                />
                            ))}
                        </div>
                    </>}
                    <div>
                        <div>
                            All course
                        </div>
                        {courseList.map((course, index) => (
                            <CourseCard insertCourseByMouseEnter={insertCourseByMouseEnter}
                                isSemOne={isSemOne} deleteCourseinLists={deleteCourseinLists}
                                selectedCourseList={selectedCourseList}
                                key={index} course={course} index={index}
                                deleteCourse={deleteCourse} insertCourse={insertCourse}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};



export default SearchTool;