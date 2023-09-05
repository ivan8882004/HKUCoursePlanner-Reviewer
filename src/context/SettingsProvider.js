import { createContext, useState } from "react";


const TableContext = createContext();

function TimeTableProvider({ children }) {

  const [detail, setDetail] = useState(null)

  const [hour, setHour] = useState([8, 19]);

  const [uploaded, setUploaded] = useState(null);

  const [importSetting, setImportSetting] = useState(1);

  const [days, setDays] = useState(new Map([
    ['MON', true],
    ['TUE', true],
    ['WED', true],
    ['THU', true],
    ['FRI', true],
    ['SAT', false],
    ['SUN', false]
  ]));

  const add_drop_day = (day) => {
    const updatedDays = new Map(days);
    updatedDays.set(day, !updatedDays.get(day));
    setDays(updatedDays);
  };


  const valueToShare = {
    hour, setHour, days, add_drop_day, importSetting, setImportSetting, detail, setDetail, uploaded, setUploaded
  };

  return <TableContext.Provider value={valueToShare}>
    {children}
  </TableContext.Provider>
}

export { TimeTableProvider };

export default TableContext;