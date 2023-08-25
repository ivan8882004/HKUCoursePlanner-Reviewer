import { createSlice } from "@reduxjs/toolkit";

const STUDYPLAN = "studyPlan";

const studyPlanSlice = createSlice({
    name: "studyPlan",
    initialState: {
        plan: [[], [], [], [], [], [], [], [], []],
        degree: {
            name: "",
            ug5cc: 0,
            ug5leng: [],
            courseList: [],
            focus: []
        },
        major: {
            name: "",
            type: "",
            courseList: [],
            doubleCount: []
        },
        minor1: {
            name: "",
            type: "",
            courseList: [],
            doubleCount: []
        },
        minor2: {
            name: "",
            type: "",
            courseList: [],
            doubleCount: []
        }
    },
    reducers: {
        setStudyPlan(state, action) {
            state.plan = action.payload.plan;
            state.degree = action.payload.degree;
            state.major = action.payload.major;
            state.minor1 = action.payload.minor1;
            state.minor2 = action.payload.minor2;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setPlan(state, action) {
            state.plan = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setDegree(state, action) {
            state.degree = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setMajor(state, action) {
            state.major = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setMinor1(state, action) {
            state.minor1 = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setMinor2(state, action) {
            state.minor2 = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        addPlanItem(state, action) { //give me {index: course:}
            const index = state.plan[action.payload.index].findIndex(course => course.name === action.payload.course.name)
            if (index === -1) {
                state.plan[action.payload.index].push(action.payload.course)
            }
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        removePlanItem(state, action) { //give me {index: course:}
            const index = state.plan[action.payload.index].findIndex(course => course.name === action.payload.course.name)
            if (index !== -1) {
                state.plan[action.payload.index] = [...state.plan[action.payload.index].slice(0, index), ...state.plan[action.payload.index].slice(index + 1)]
            }
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        addPlanFyp(state, action) { //give me {index: course:}
            const indexToAdd = action.payload.index - (1 - action.payload.index % 2);
            const index = state.plan[indexToAdd].findIndex(course => course.name === action.payload.course.name)
            if (index === -1) {
                state.plan[indexToAdd].push(action.payload.course)
            }
            const secIndex = state.plan[indexToAdd + 1].findIndex(course => course.name === action.payload.course.name)
            if (secIndex === -1) {
                state.plan[indexToAdd + 1].push(action.payload.course)
            }
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        removePlanFyp(state, action) {
            const indexToRemove = action.payload.index - (1 - action.payload.index % 2);
            const index = state.plan[indexToRemove].findIndex(course => course.name === action.payload.course.name)
            if (index !== -1) {
                state.plan[indexToRemove] = [...state.plan[action.payload.index].slice(0, index), ...state.plan[action.payload.index].slice(index + 1)]
            }
            const secIndex = state.plan[indexToRemove + 1].findIndex(course => course.name === action.payload.course.name)
            if (secIndex !== -1) {
                state.plan[indexToRemove + 1] = [...state.plan[action.payload.index].slice(0, secIndex), ...state.plan[action.payload.index].slice(secIndex + 1)]
            }
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        }
    }
})

export const { setStudyPlan, setPlan, setDegree, setMajor, setMinor1, setMinor2, addPlanItem, removePlanItem, addPlanFyp, removePlanFyp } = studyPlanSlice.actions;
export const studyPlanReducer = studyPlanSlice.reducer;
export { STUDYPLAN };