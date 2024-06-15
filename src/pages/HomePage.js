import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ConfigUpdateModal from '../components/ConfigUpdateModal'
import { LATEST_CONFIG_VERSION } from '../configVersion'

function HomePage() {
  const hoverFocusClasses =
    'hover:bg-accent hover:text-white focus:bg-accent focus:text-white outline-none active:opacity-25 transition-opacity'

  const configVersion = localStorage.getItem('configVersion')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="animate__animated animate__fadeIn animate__fast flex h-full select-none flex-col items-center justify-center text-center">
      <div className="animate__animated animate__slideInDown animate__faster text-2xl sm:text-3xl md:text-5xl">
        Welcome to{' '}
      </div>
      <div className="animate__animated animate__jackInTheBox mb-7 bg-accent p-3 text-3xl font-bold text-white animation-delay-300 max-md:py-2 max-sm:py-1 sm:text-4xl md:text-6xl">
        <u>
          <i>Course Planner</i>
        </u>{' '}
        📚🗓️
      </div>
      <div className="mb-10 text-lg sm:text-xl md:text-2xl">
        Plan your academic journey.
      </div>
      <NavLink
        to="/HKUCoursePlanner-Reviewer/timetable"
        className={
          'animate__animated animate__pulse animate__infinite mb-10 w-72 border-2 border-accent p-0.5 text-accent transition-opacity animation-delay-[2s] active:opacity-25 sm:w-80 ' +
          hoverFocusClasses
        }>
        GET STARTED
      </NavLink>

      <div className="max-md:text-sm">
        Made with ❤️ by <br className="sm:hidden" />
        <a
          href="https://github.com/Walter-Tong"
          className={'underline ' + hoverFocusClasses}>
          Walter-Tong
        </a>{' '}
        •{' '}
        <a
          href="https://github.com/ivan8882004"
          className={'underline ' + hoverFocusClasses}>
          ivan8882004
        </a>{' '}
        •{' '}
        <a
          href="https://kennethkn.github.io/kennethkn/"
          className={'underline ' + hoverFocusClasses}>
          kennethkn
        </a>
      </div>

      <div className="mb-10 max-md:text-sm">
        <br className="sm:hidden" />
        Please star on{' '}
        <a
          href="https://github.com/ivan8882004/HKUCoursePlanner-Reviewer"
          className={'underline ' + hoverFocusClasses}>
          GitHub
        </a>{' '}
        if you find it useful 🚀
        <div className="font-bold sm:hidden">
          <br />
          Course Planner is best viewed on desktop.
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full flex-col items-center bg-white pt-2 font-mono text-xs">
        Encounter any issue?
        <button
          onClick={() => {
            localStorage.clear()
            setTimeout(() => {
              window.location.reload()
            }, 500)
          }}
          className={
            'mb-10 w-40 border-2 border-accent p-0.5 text-accent transition-transform active:translate-y-1 ' +
            hoverFocusClasses
          }>
          RELOAD APP
        </button>
        <button
          onClick={
            configVersion === LATEST_CONFIG_VERSION
              ? () => false
              : () => setIsModalOpen(true)
          }
          className={
            'pb-2 font-sans text-sm ' +
            (configVersion === LATEST_CONFIG_VERSION ? 'cursor-default' : '')
          }>
          Config Version:{' '}
          <span
            className={
              configVersion !== LATEST_CONFIG_VERSION ? 'text-red-600' : ''
            }>
            {configVersion}{' '}
            {configVersion !== LATEST_CONFIG_VERSION
              ? '(click me)'
              : '(latest)'}
          </span>
        </button>
        <ConfigUpdateModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {/* <div className="w-[30rem] max-md:w-[26rem] max-md:text-sm">
        Disclaimer: Degree and course information provided on{' '}
        <i>Course Planner</i> was manually entered and is currently maintained
        as a{' '}
        <a
          href="https://github.com/Walter-Tong/Course_Planner_Config"
          className={'underline ' + hoverFocusClasses}>
          config
        </a>
        . We recommend double-checking with the official syllabus after creating
        your plan here 😉
      </div> */}
    </div>
  )
}

export default HomePage
