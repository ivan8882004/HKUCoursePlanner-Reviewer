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
        setStudyPlan(state, action){
            state.plan = action.payload.plan;
            state.degree = action.payload.degree;
            state.major = action.payload.major;
            state.minor1 = action.payload.minor1;
            state.minor2 = action.payload.minor2;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setPlan(state, action){
            state.plan = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setDegree(state, action){
            state.degree = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setMajor(state, action){
            state.major = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setMinor1(state, action){
            state.minor1 = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        setMinor2(state, action){
            state.minor2 = action.payload;
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        addPlanItem(state, action){ //give me {index: course:}
            const index = state.plan[action.payload.index].findIndex(course => course.name === action.payload.course.name)
            if (index === -1) {
                state.plan[action.payload.index].push(action.payload.course)
            }
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        },
        removePlanItem(state, action){ //give me {index: course:}
            const index = state.plan[action.payload.index].findIndex(course => course.name === action.payload.course.name)
            if (index !== -1){
                state.plan[action.payload.index] = [...state.plan[action.payload.index].slice(0, index), ...state.plan[action.payload.index].slice(index + 1)]
            }
            localStorage.setItem(STUDYPLAN, JSON.stringify(state))
        }
    }
})

export const { setStudyPlan, setPlan, setDegree, setMajor, setMinor1, setMinor2, addPlanItem, removePlanItem } = studyPlanSlice.actions;
export const studyPlanReducer = studyPlanSlice.reducer;
export { STUDYPLAN };