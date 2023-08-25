function getCourses(name, courses) {
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].name === name) {
            return courses[i]
        }
    }
}

export default getCourses;