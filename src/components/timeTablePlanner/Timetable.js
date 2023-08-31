import React, { useContext } from 'react';
import TableContext from '../../context/SettingsProvider';
import TimeSlot from './TimeSlot';

const Timetable = ({ selectedCourseList }) => {
  const { hour, days } = useContext(TableContext);

  const times = [];
  for (let i = hour[0]; i < hour[1]; i++) {
    times.push(`${i}:30-${i + 1}:20`);
  }




  return (
    <div className="table">
      <div className="row">
        <div className="header"></div>
        {[...days].map(([day, isActive]) => isActive && <div key={day} className="header">{day}</div>)}
      </div>

      {times.map((time, index) => (
        <div key={index} className="row">
          <div className="header">{time}</div>
          {[...days].map(([day, isActive]) => isActive && <TimeSlot key={`${day}-${time}`} day={day} time={time} selectedCourseList={selectedCourseList} />)}
        </div>
      ))}
    </div>
  );
};

export default Timetable;