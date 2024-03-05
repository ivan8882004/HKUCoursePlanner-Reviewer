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
      //for the venue of each lecture
      if (item.venue.substring(0, key.length) === key) {
        venue = value + item.venue.substring(key.length)
      }
    })

    return (
      <div key={index} className="mb-2">
        {item.day} {item.time}
        <div>{venue}</div>
      </div>
    )
  })

  return (
    <div className="no-scrollbar mb-5 h-1/3 space-y-2 overflow-scroll overscroll-contain border-2 border-accent pb-1">
      <div className="sticky top-0 px-2 py-1 backdrop-blur-lg">
        <div className="font-mono font-bold">{course.courseName}</div>
        <div className="font-medium">{course.courseTitle}</div>
      </div>
      <div className="px-2"> {lectures}</div>
    </div>
  )
}

export default CourseDetail
