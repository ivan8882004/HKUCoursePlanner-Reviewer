import { createContext, useState } from "react";


const TableContext = createContext();

function TimeTableProvider({ children }) {

  const [hour, setHour] = useState([8, 23]);



  const [days, setDays] = useState(new Map([
    ['MON', true],
    ['TUE', true],
    ['WED', true],
    ['THU', true],
    ['FRI', true],
    ['SAT', true],
    ['SUN', true]
  ]));

  const add_drop_day = (day) => {
    const updatedDays = new Map(days);
    updatedDays.set(day, !updatedDays.get(day));
    setDays(updatedDays);
  };


  const valueToShare = {
    hour, setHour, days, add_drop_day,
  };

  return <TableContext.Provider value={valueToShare}>
    {children}
  </TableContext.Provider>
}

export { TimeTableProvider };

export default TableContext;