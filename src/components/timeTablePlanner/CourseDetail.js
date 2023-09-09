function CourseDetail({ course }) {
  const pos = {
    CB: 'Chow Yei Ching Building',
    CCT: 'Cheng Yu Tung Tower',
    CJT: 'Jockey Club Tower',
    CRT: 'Run Run Shaw Tower',
    CPD: 'Central Podium Levels, Centennial Campus',
    CYC: 'Chong Yuet Ming Chemistry Building',
    CYP: 'Chong Yuet Ming Physics Building',
    EH: 'Eliot Hall',
    JL: 'James Hsioung Lee Science Building',
    JMSCDMLAB: 'JMSC Digital Media Lab',
    KB: 'Knowles Building',
    KK: 'K.K. Leung Building',
    LE: 'Library Extension',
    MB: 'Main Building',
    MW: 'Meng Wah Complex',
    RHT: 'Rayson Huang Theatre',
    TT: 'T.T. Tsui Building',
    RM: 'Runme Shaw Building',
    RR: 'Run Run Shaw Building',
    TWFINNO: 'Tam Wing Fan Innovation Wing',
    ONLINE: 'online',
    HW: 'Haking Wong Building',
    GH: 'Graduate House',
    WLGH: 'Wang Gungwu Lecture Hall',
    TBA: 'To be announced',
  }

  const lectures = course.lectures.map((item, index) => {
    let venue = item.venue

    Object.entries(pos).forEach(([key, value]) => {
      if (item.venue.substring(0, key.length) === key) {
        venue = value + item.venue.substring(key.length)
      }
    })

    return (
      <div key={index}>
        Day: {item.day} Time: {item.time}
        <div>{venue}</div>
      </div>
    )
  })

  return (
    <div className="courseDetail">
      <h4>Course Detail</h4>
      {course.courseName}
      <div>{course.courseTitle}</div>
      <div>{lectures}</div>
    </div>
  )
}

export default CourseDetail
