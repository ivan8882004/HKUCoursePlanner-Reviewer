import searchPlan from "./searchPlan";

function checkPrereg(course, index, plan) {
    for (let i = 0; i < course.prereg.length; i++) {
        let notFind = true;
        for (let j = 0; j < course.prereg[i].length; j++) {
            let toCheck;
            let indexToCheck
            if (course.prereg[i][j][0] === "e") {
                console.log(course.prereg[i][j])
                toCheck = course.prereg[i][j].substring(1)
                indexToCheck = index + 1
            } else {
                toCheck = course.prereg[i][j]
                indexToCheck = index
            }
            const toProcessList = toCheck.split("&");
            let checker = 0;
            for (let k = 0; k < toProcessList.length; k++) {
                checker += !!searchPlan(toProcessList[k], indexToCheck, plan);
            }
            if (checker === toProcessList.length) {
                notFind = false;
                break;
            }
        }
        if (notFind) {
            return false;
        }
    }
    return true;
}

export default checkPrereg;