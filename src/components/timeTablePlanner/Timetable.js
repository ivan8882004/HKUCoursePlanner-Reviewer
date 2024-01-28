import React, { useContext } from 'react'
import TableContext from '../../context/SettingsProvider'
import TimeSlot from './TimeSlot'

const Timetable = ({ selectedCourseList }) => {
  const { add_drop_day } = useContext(TableContext)

  const { hour, days, setHour } = useContext(TableContext)

  const times = []
  for (let i = hour[0]; i < hour[1]; i++) {
    times.push(`${i}:30-${i + 1}:20`)
  }

  const buttonClasses =
    'h-full font-mono w-7 font-bold disabled:cursor-not-allowed disabled:opacity-25 enabled:hover:bg-accent enabled:hover:text-white active:opacity-25 transition-opacity'

  const tdClasses =
    'border-accent border-2 text-center font-light overflow-scroll no-scrollbar'

  return (
    <div className='ml-5 mt-2 h-[calc(100%-0.5rem)] w-full overflow-scroll min-w-[48rem] max-w-[60rem] no-scrollbar'>
      <table className="w-full h-full table-fixed border-collapse border-2 border-accent text-sm">
        <colgroup>
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
          <col className="w-[12.5%]" />
        </colgroup>
        <thead>
          <tr>
            <th>
              <div className="text-left">
                <button
                  className={buttonClasses}
                  disabled={!(hour[0] - 8 > 0)}
                  onClick={() => setHour([hour[0] - 1, hour[1]])}>
                  +
                </button>
                <button
                  className={buttonClasses}
                  disabled={!(hour[0] - 22 < 0 && hour[0] + 1 < hour[1])}
                  onClick={() => setHour([hour[0] + 1, hour[1]])}>
                  -
                </button>
              </div>
            </th>
            {[...days].map(
              ([day, isActive]) =>
                isActive && (
                  <th scope="col">
                    <button
                      key={day}
                      onClick={() => add_drop_day(day)}
                      className="group w-full font-bold transition-opacity hover:bg-accent hover:text-white active:opacity-25">
                      <span className="group-hover:hidden">{day}</span>
                      <span className="hidden group-hover:block">-</span>
                    </button>
                  </th>
                )
            )}
            {[...days].map(
              ([day, isActive]) =>
                !isActive && (
                  <th scope="col">
                    <button
                      key={day}
                      onClick={() => add_drop_day(day)}
                      className="w-full font-bold transition-opacity hover:bg-accent hover:text-white active:opacity-25">
                      +
                    </button>
                  </th>
                )
            )}
          </tr>
        </thead>

        <tbody>
          {times.map((time, index) => (
            <tr key={index} className="h-12">
              <td className={tdClasses}>{time}</td>
              {[...days].map(([day, isActive]) =>
                isActive ? (
                  <td className={tdClasses}>
                    <TimeSlot
                      key={`${day}-${time}`}
                      day={day}
                      time={time}
                      selectedCourseList={selectedCourseList}
                    />
                  </td>
                ) : (
                  <td className={tdClasses}></td>
                )
              )}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>
              <div>
                <button
                  className={buttonClasses}
                  disabled={!(hour[1] - 23 < 0)}
                  onClick={() => setHour([hour[0], hour[1] + 1])}>
                  +
                </button>
                <button
                  className={buttonClasses}
                  disabled={!(hour[1] - 9 > 0)}
                  onClick={() => setHour([hour[0], hour[1] - 1])}>
                  -
                </button>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Timetable
