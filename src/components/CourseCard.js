import {  useEffect, useState } from "react";
import CourseList from "./CourseList";

function CourseCard({ course, deleteCourse, insertCourse, selectedCourseList, isSemOne,insertCourseByMouseEnter}) {
 
    const [isChecked, setIsChecked] = useState(false);
    
        /*useEffect(() => {
            console.log(selectedCourseList);
        
        if (selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName ) ) { 
            

            setIsChecked(true);

            course.isChecked = true;
            console.log("check box is checked?",course.isChecked);
            console.log(isChecked);
        } 
        else {
            course.isChecked = false;
            setIsChecked(false);

        }
            
        }, [selectedCourseList]); */
        
        
        /*useEffect(() => {
        
        if (!selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName ) ) { 
            course.isChecked = false;
            setIsChecked(false);

        }
            
        }, [selectedCourseList]);

        useEffect(() => {
            console.log(selectedCourseList);
        
        if (selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName && course_in_list.isChecked === true ) ) { 
            
            setIsChecked(true);

        }
            
        }, [isSemOne]); */

    useEffect(() => {
        
        console.log(selectedCourseList);

        if (selectedCourseList.some(course_in_list => course_in_list.courseName === course.courseName && course_in_list.isChecked === true )) {
            setIsChecked(true);
        }

        else { setIsChecked(false);}





    });

    const handleChange = (event) => {

        
        const isCheckBoxChecked=event.target.checked
        console.log("check box is checked?",isCheckBoxChecked)

        if (isCheckBoxChecked) {
           
            insertCourse(course);
            
        }
        else {
           
            deleteCourse(course);

        }

        // setIsChecked(!isChecked);
        setIsChecked(isCheckBoxChecked);
    };

    const handleMouseLeave = () => {
        if (isChecked == false) {
            deleteCourse(course)
        };
    };

    const handleMouseEnter = () => {
        if (isChecked == false) {
            insertCourseByMouseEnter(course)
        };
    }; 

    return (
        <div className="courseContainer">
            <input
                type="checkbox" className="checkbox"
                checked={isChecked}
                onChange={handleChange}
            />
            <div className="cardColumn"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <p>{course.courseName}<br></br>{course.courseTitle}</p>
            </div>
        </div>
    );

};
export default CourseCard;


