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
        style={{
          overlay: {
            zIndex: 100,
          },
        }}>
        <div className="space-y-2 font-poppins font-light leading-relaxed">
          <p>
            <span className="bg-accent px-2 font-bold italic text-white">
              Smart Scheduler
            </span>{' '}
            can help you schedule courses that you plan to take in a semester.
            It works by gathering infomation about your perferences, then
            calculating a perference score, and finally presenting the best
            possible schedules in a ranked list for you to choose.
          </p>

          <p>To use it, you need to provide your perferences as follows:</p>

          <p>
            <span className="font-medium">Courses to Schedule:</span> You should
            put the course codes of which you want to schedule here.
          </p>
          <p>
            <span className="font-medium">Day-off Bonus:</span> How badly do you
            want a day-off? If the answer is "YESSSS", adjust this setting all
            the way up to give the schedules that offer a day-off a substantial
            bonus score. Or, give less if this is not as much of a consideration
            to you (We respect your dilligence)
          </p>

          <div>
            <p>
              <span className="font-medium">"Too Early!" Time:</span> How early
              in the morning would you be uncomfortable having a lesson? We bet
              most would say 8:30 so the default setting is 8:30, but you can
              change it.
            </p>
            <p>
              ↪ <span className="font-medium">Violation Penalty:</span>{' '}
              Penalise the schedules that violates the above perference. If you
              really don't like morning classes, put this all the way up!
            </p>
          </div>

          <div>
            <p>
              <span className="font-medium">Maximum Gap Hours:</span> It can be
              painful having to stay at campus the whole day because of improper
              scheduling of one lesson at early morning and another at late
              evening. How many hours in between lessons can you at most
              tolerate? You can state it here.
            </p>
            <p>
              ↪ <span className="font-medium">Violation Penalty:</span>{' '}
              Penalise the schedules that violates the above perference. If you
              really want to prevent huge gaps between lessons, turn the penalty
              up!
            </p>
          </div>
        </div>
      </ReactModal>
    </>
  )
}

export default AutoFillFormInfo
