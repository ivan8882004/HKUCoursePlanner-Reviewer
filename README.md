<div align="center">
  <img src="./public/favicon.ico" width="128" height="128" />
  <h3>📚 HKU Course Planner</h3>
  <p>Navigate Your Academic Success with HKU Course Planner</p>
</div>

## :rocket: Features Overview

### Visualize of pre-reg relationship of courses
<div>
  <img src="./screenshot/prereg-graph.png" />
  <p>We visualzied the complex relationship of the complex pre-reg relationship of courses, the graph is rendered in real time when user click on any program in the side bar in the View Major Minor page</p>
</div>

### Course Planner (experimental)
<div>
  <img src="./screenshot/course-planner.gif" />
  <p>This is planner for planning the study plan among the whole unversity studies, the planner allow user to place courses to take by drag and drop. For courses that its pre-reg course is planned to take would show in green, for those pre-reg is not fulfill it will be in red, for those have excludsive course taken, it will be in orange. </p>
  Current Issue
  <ul style="list-style-type:square;">
    <li>For courses with special pre-reg condition, the graph cannot determine if the condition is passed, i.e capstone experience for STAT</li>
    <li>
      In the below cases, the problem of double count on credit will show up in the credit counter of program/major/minor, while double count is not allow among most major and minor
      <ul>
        <li>If a program and major/minor both have the same course as its requirement, i.e. minor in FINA and minor in ECON</li>
        <li>If a course can be used to fulfill more than one requirement of the same program/major/minor, i.e. in double major in CS, COMP3297 can be used to count as an elective course or capstone experience, however, this double counting is not allowed</li>
      </ul>
    </li>
    <li>Also for some major, double count for some courses is allowed, under some condition, i.e. science school students take science school major as their second major, also for FBE student, however, the current version cannot handle this double count well</li>
    <li>For some courses, i.e. engine training for engine students, it only open in summer sem, but the current version don't handle this</li>
  </ul>
</div>

### Time Table Planner
<div>
  <img src="./screenshot/time-table.gif" />
  <p>
    The is time table planner inspired by <a href="https://github.com/hovergecko/timetable">HKU Timetable</a>. And we have added new twists on it:
  </p>
  <ul style="list-style-type:square;">
    <li>Using localstorage to store selected course</li>
    <li>Having default storaged time table storage in the app</li>
    <li>Importing selected course from the course planner</li>
    <li>Showing courses lecture room location with full name</li>
    <li>Course auto fill based on scoring on no. of day off, early lesson & gap hours</li>
  </ul>
</div>

## :gem: Credits

|Contributors|contribution|
|--|--|
|Walter-Tong|Visualization of pre-reg relationship of courses, Course Planner, Config Edit Form & Auto fill function of time table planner|
|ivan8882004|Time Table Planner Page|
|kennethkn|Refractor of UI/UX (in progress)|

## :bulb: Start Planning Today

<https://ivan8882004.github.io/HKUCoursePlanner-Reviewer/>

## :handshake: Contributing

If you find any bugs or have suggestions for improvement, please feel free to create an issue.

_p.s. Star this project & share it with your friends if it helped!_ 😉
