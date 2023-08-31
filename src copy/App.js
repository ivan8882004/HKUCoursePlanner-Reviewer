import React, { useState } from 'react';
import './index.css'
import Timetable from './components/Timetable';
import CourseList from './components/CourseList';
import SearchTool from './components/SearchTool';

const App = () => {

  const [isSemOne, setIsSemOne] = useState(true);
  const [courseList, setCourseList] = useState([]);

  const [selectedSem1CourseList, setSelectedSem1CourseList] = useState([]);
  const [selectedSem2CourseList, setSelectedSem2CourseList] = useState([]);

  let selectedCourseList;
  let setSelectedCourseList;

  if (isSemOne == true) {
    selectedCourseList = selectedSem1CourseList;
    setSelectedCourseList = setSelectedSem1CourseList;}

  else {
    selectedCourseList = selectedSem2CourseList;
    setSelectedCourseList = setSelectedSem2CourseList;
  }

  const deleteCourse = (course_to_be_deleted) => {
    setSelectedCourseList((prevList) => {
      return prevList.filter((course) => course.courseName !== course_to_be_deleted.courseName);
    })
  };

  const insertCourse = (course_to_be_inserted) => {
    setSelectedCourseList((prevList) => {
      return [...prevList, {...course_to_be_inserted, isChecked : true}];
    })
  };

  const insertCourseByMouseEnter = (course_to_be_inserted) => {
    setSelectedCourseList((prevList) => {
      return [...prevList, {...course_to_be_inserted, isChecked : false}];
    })
  };

  const deleteCourseinLists = (course_to_be_deleted) => {
    console.log('delete',course_to_be_deleted.courseName);
    if ( selectedSem1CourseList.some(course => course_to_be_deleted.courseName == course.courseName)) {
      setSelectedSem1CourseList((prevList) => {
        return prevList.filter((course) => course.courseName !== course_to_be_deleted.courseName);
      })
    }

    else {
      setSelectedSem2CourseList((prevList) => {
        return prevList.filter((course) => course.courseName !== course_to_be_deleted.courseName);
      })
    }
  };

  return (
    <div className='main'>
      <SearchTool deleteCourse={deleteCourse} insertCourse={insertCourse}
        courseList={courseList} setCourseList={setCourseList}
        setIsSemOne={setIsSemOne} isSemOne={isSemOne} selectedCourseList={selectedCourseList}
        deleteCourseinLists={deleteCourseinLists} insertCourseByMouseEnter={insertCourseByMouseEnter}
      />
      <Timetable selectedCourseList={selectedCourseList} />
      <CourseList selectedSem1CourseList={selectedSem1CourseList} selectedSem2CourseList={selectedSem2CourseList} deleteCourse={deleteCourse}
      deleteCourseinLists={deleteCourseinLists}
      />
    </div>

  );
};

export default App;