import { NavLink } from 'react-router-dom'

function HomePage() {
  const hoverFocusClasses =
    'hover:bg-accent hover:text-white focus:bg-accent focus:text-white outline-none'

  return (
    <div className="flex h-full animate-fade-in select-none flex-col items-center justify-center text-center">
      <div className="text-5xl max-md:text-3xl">Welcome to </div>
      <div className="mb-7 bg-accent p-3 text-6xl font-bold text-white max-md:text-4xl">
        <u>
          <i>Course Planner</i>
        </u>{' '}
        📚🗓️
      </div>
      <div className="mb-10 font-mono text-2xl max-md:text-xl">
        Plan your academic journey.
      </div>
      <NavLink
        to="/HKUCoursePlanner-Reviewer/study_plan"
        className={
          'mb-10 w-80 border-2 border-accent p-0.5 text-accent transition-transform active:translate-y-1 ' +
          hoverFocusClasses
        }>
        GET STARTED
      </NavLink>

      <div className="max-md:text-sm">
        Made with ❤️ by{' '}
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
          href="https://github.com/kennethkn"
          className={'underline ' + hoverFocusClasses}>
          kennethkn
        </a>
      </div>

      <div className="mb-10 max-md:text-sm">
        Please star on{' '}
        <a
          href="https://github.com/ivan8882004/HKUCoursePlanner-Reviewer"
          className={'underline ' + hoverFocusClasses}>
          GitHub
        </a>{' '}
        if you find it useful 🚀🚀🚀
      </div>

      <div className="w-[30rem] max-md:w-[26rem] max-md:text-sm">
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
      </div>
    </div>
  )
}

export default HomePage
