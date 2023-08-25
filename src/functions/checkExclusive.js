import searchPlan from "./searchPlan";

function checkExclusive(course, index, plan) {
    for (let i = 0; i < course.exclusive.length; i++) {
        if (searchPlan(course.exclusive[i], index + 1, plan)) {
            return true;
        }
    }
    return false
}

export default checkExclusive;