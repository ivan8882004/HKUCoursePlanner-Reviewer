function searchPlan(name, index, plan) {
    const toSearch = [...plan.slice(0, index)]

    for (let i = 0; i < toSearch.length; i++) {
        for (let j = 0; j < toSearch[i].length; j++) {
            if (toSearch[i][j].name === name) {
                return toSearch[i][j]
            }
        }
    }
    return false
}

export default searchPlan;