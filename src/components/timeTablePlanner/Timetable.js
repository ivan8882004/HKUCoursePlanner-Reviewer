import React, { useContext } from 'react';
import TableContext from '../../context/SettingsProvider';
import TimeSlot from './TimeSlot';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const Timetable = ({ selectedCourseList }) => {
  const { add_drop_day } = useContext(TableContext)

  const { hour, days, setHour } = useContext(TableContext);

  const times = [];
  for (let i = hour[0]; i < hour[1]; i++) {
    times.push(`${i}:30-${i + 1}:20`);
  }




  return (
    <div className="table">
      <div className="row">
        <div className="header">
          <div className="buttons">
            {((hour[0] - 8) > 0 && <div className="changeHour" onClick={() => setHour([hour[0] - 1, hour[1]])}><AiFillCaretDown /></div>)}
            {(((hour[0] - 22) < 0 && (hour[0] + 1 < hour[1])) && <div className="changeHour" onClick={() => setHour([hour[0] + 1, hour[1]])}><AiFillCaretUp /></div>)}
          </div>
        </div>
        {[...days].map(([day, isActive]) => isActive && <div key={day} className="header" onClick={() => add_drop_day(day)}><div className="content on">{day}</div><div className="hide">-</div></div>)}
        <div>
          {[...days].map(([day, isActive]) => !isActive && <div key={day} className="headerOff" onClick={() => add_drop_day(day)}><div className="content off">+</div></div>)}
        </div>
      </div>

      {times.map((time, index) => (
        <div key={index} className="row">
          <div className="header"><div className="content">{time}</div></div>
          {[...days].map(([day, isActive]) => isActive && <TimeSlot key={`${day}-${time}`} day={day} time={time} selectedCourseList={selectedCourseList} />)}
        </div>
      ))}
      <div className="row">
        <div className="header">
          <div className="buttons">
            {((hour[1] - 9) > 0 && <div className="changeHour" onClick={() => setHour([hour[0], hour[1] - 1])}><AiFillCaretUp /></div>)}
            {((hour[1] - 23) < 0 && <div className="changeHour" onClick={() => setHour([hour[0], hour[1] + 1])}><AiFillCaretDown /></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;