import SelectedCourseCard from "./SelectedCourseCard";

function CourseList({ selectedSem1CourseList, selectedSem2CourseList, deleteCourseinLists }) {
  return (
    <div>
      <div>
        <div>First Semester</div>
        {selectedSem1CourseList.map((course, index) => (
          <SelectedCourseCard key={index} course={course} deleteCourseinLists={deleteCourseinLists}/>
        ))}
        <div>Second Semester</div>
        {selectedSem2CourseList.map((course, index) => (
          <SelectedCourseCard key={index} course={course} deleteCourseinLists={deleteCourseinLists}/>
        ))}
      </div>
    </div>
  );
}

export default CourseList;