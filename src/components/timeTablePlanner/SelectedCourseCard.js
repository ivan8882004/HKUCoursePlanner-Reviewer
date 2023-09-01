function SelectedCourseCard ({course,deleteCourseinLists}) {

    const handleOnClick = () => {
        course.isChecked=false
        deleteCourseinLists(course);
    }

    return (
        <div className="listContainer">
            <div className="cardColumn">
                <p>{course.courseName}<br></br><span className="fullName">{course.courseTitle}</span></p>
            </div>
            <div>
                <button onClick={handleOnClick}>Delete</button>
            </div>
        </div>
)};

export default SelectedCourseCard;