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
        className="mr-1 cursor-pointer text-xs font-normal opacity-50 transition hover:text-accent hover:opacity-100">
        What is this?
      </div>
      <ReactModal
        isOpen={open}
        onRequestClose={handleClose}
        ariaHideApp={false}
        closeTimeoutMS={300}
        style={{
          content: {
            borderRadius: 0,
            height: 'fit-content',
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
          },
          overlay: {
            zIndex: 100,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          },
        }}>
        <div className="select-none space-y-2 font-poppins font-light">
          <p>
            <span className="bg-accent px-2 font-bold italic text-white">
              Smart Scheduler
            </span>{' '}
            is a tool that helps you schedule your courses for a semester. It
            takes into account your preferences and shows you the best possible
            schedules.
          </p>

          <p>To use it, you need to:</p>

          <p>
            <span className="font-medium">Enter the course codes</span> of the
            courses you want to take.
          </p>
          <p>
            <span className="font-medium">Adjust the day-off bonus</span> to
            give extra points to schedules that have no classes on certain days.
          </p>
          <div>
            <p>
              <span className="font-medium">
                Specify the earliest class time
              </span>{' '}
              to indicate the earliest time you are willing to have a class.
            </p>
            <p>
              ↪ <span className="font-medium">Set the violation penalty</span>{' '}
              to deduct points from schedules that have classes before the
              earliest class time.
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium">Specify the maximum gap hours</span>{' '}
              to indicate the maximum number of hours you can tolerate between
              classes in a day.
            </p>
            <p>
              ↪ <span className="font-medium">Set the violation penalty</span>{' '}
              to deduct points from schedules that have more gap hours than the
              maximum.
            </p>
          </div>

          <p>
            After you have entered your preferences, you can click{' '}
            <span className="bg-accent px-2 text-sm font-normal text-white">
              Get Schedule Recommendations
            </span>{' '}
            to see the best schedules for you. You can choose the one that suits
            you best.
          </p>
        </div>
      </ReactModal>
    </>
  )
}

export default AutoFillFormInfo
