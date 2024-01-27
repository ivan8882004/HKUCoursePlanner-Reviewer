import { useState } from 'react'
import ReactModal from 'react-modal'

function AutoFillFormInfo() {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="mr-2 cursor-pointer text-xs font-normal opacity-50 transition hover:text-accent hover:opacity-100">
        What is this?
      </div>
      <ReactModal
        isOpen={open}
        onRequestClose={handleClose}
        ariaHideApp={false}>
        <div className="font-poppins">
          <span className="bg-accent px-2 font-bold italic text-white">
            Smart Scheduler
          </span>
          helps you schedule courses Courses To Fill: The courses to
          be auto fill. The program will find all possible courses by each input
          term of each input field. For example COMP2119 possilbe course will be
          [COMP2119-1A, COMP2119-1B, ...] (please notice that the auto fill will
          just add course in the current sem determine by the buttons on the
          left). You can type the course code with the sub class, i.e. if you
          are a good CS student, you are supposed to take sub-class A instead of
          B, then you can type COMP2119-1A to just search with sub-class A You
          can also use "|" character to search with more than one course code
          same time, i.e. COMP3322|COMP3329 possible course will be
          [COMP3322..., COMP3329...] At last you can use just part of the course
          code to search, i.e. COMP3 stand for all level 3 COMP course Day Off
          Score: The score of when there is a day off, please notice that if you
          have lesson on move than 6 days in a week, the day off score could be
          negative. Early Time: The time that you think in too early. Early
          Score: The score to be added when there is a lesson that start on or
          before the early time, default negative Gap Hours: The lower bounder
          of gap hours that you cannot accept. Gap Score: The score to be added
          if the total hours of gap in a day is large than or equal to the gap
          hours, if the gap hour is 3, and there is 4 gap hour in a day, the gap
          score will be add twice for that day.
        </div>
      </ReactModal>
    </>
  )
}

export default AutoFillFormInfo
