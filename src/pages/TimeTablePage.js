import { useContext, useState } from 'react';
import Timetable from '../components/timeTablePlanner/Timetable';
import CourseList from '../components/timeTablePlanner/CourseList';
import SearchTool from '../components/timeTablePlanner/SearchTool';
import UploadXlsx from '../components/timeTablePlanner/UploadXlsx';
import AutoFillForm from '../components/timeTablePlanner/AutoFillForm';
import TableContext from '../context/SettingsProvider';
import CourseDetail from '../components/timeTablePlanner/CourseDetail';

const TimeTablePage = () => {

  const { detail } = useContext(TableContext)

  const [isSemOne, setIsSemOne] = useState(true);
  const [courseList, setCourseList] = useState([]);

  const [selectedSem1CourseList, setSelectedSem1CourseList] = useState([]);
  const [selectedSem2CourseList, setSelectedSem2CourseList] = useState([]);

  let selectedCourseList;
  let setSelectedCourseList;

  if (isSemOne) {
    selectedCourseList = selectedSem1CourseList;
    setSelectedCourseList = setSelectedSem1CourseList;
  } else {
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
      return [...prevList.filter((course) => course.courseName !== course_to_be_inserted.courseName), { ...course_to_be_inserted, isChecked: true }];
    })
  };

  const insertCourseByMouseEnter = (course_to_be_inserted) => {
    setSelectedCourseList((prevList) => {
      return [...prevList, { ...course_to_be_inserted, isChecked: false }];
    })
  };

  const deleteCourseinLists = (course_to_be_deleted) => {
    console.log('delete', course_to_be_deleted.courseName);
    if (selectedSem1CourseList.some(course => course_to_be_deleted.courseName === course.courseName)) {
      setSelectedSem1CourseList((prevList) => {
        return prevList.filter((course) => course.courseName !== course_to_be_deleted.courseName);
      })
    } else {
      setSelectedSem2CourseList((prevList) => {
        return prevList.filter((course) => course.courseName !== course_to_be_deleted.courseName);
      })
    }
  };

  let detailContent = <div></div>;

  if (detail) {
    detailContent = <CourseDetail course={detail} />
  }

  return (
    <div className='TimeTableMain'>
      <div>
        <SearchTool
          deleteCourse={deleteCourse}
          insertCourse={insertCourse}
          courseList={courseList}
          setCourseList={setCourseList}
          setIsSemOne={setIsSemOne}
          isSemOne={isSemOne}
          selectedCourseList={selectedCourseList}
          deleteCourseinLists={deleteCourseinLists}
          insertCourseByMouseEnter={insertCourseByMouseEnter}
        />
        <div>
          <UploadXlsx />
        </div>
      </div>
      <Timetable selectedCourseList={selectedCourseList} />
      <div>
        <div>
          {detailContent}
          <CourseList
            selectedSem1CourseList={selectedSem1CourseList}
            selectedSem2CourseList={selectedSem2CourseList}
            deleteCourse={deleteCourse}
            deleteCourseinLists={deleteCourseinLists}
          />
        </div>
        <div>
          <AutoFillForm isSemOne={isSemOne} setter={(isSemOne) ? setSelectedSem1CourseList : setSelectedSem2CourseList} />
        </div>
      </div>
    </div>

  );
};

export default TimeTablePage;