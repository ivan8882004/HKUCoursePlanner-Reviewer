import UploadFile from '../components/UploadFile'
import ExportFile from '../components/ExportFile'
import { NavLink } from 'react-router-dom'

function UploadExportFilePage() {
  return (
    <div className="animate__animated animate__fadeIn animate__fast flex h-full select-none flex-col items-center justify-center space-y-4 text-center">
      <div className="bg-accent px-2 py-1 text-3xl font-bold text-white">
        <u>
          <i>Course Planner</i>
        </u>{' '}
        📚🗓️
      </div>
      <ExportFile />
      <UploadFile />
      <p className="w-[36rem] font-serif text-sm max-md:w-[28rem]">
        <b>Hello there 👋 </b>As you may have noticed, the current list of
        syllabuses supported in the{' '}
        <NavLink
          to="/HKUCoursePlanner-Reviewer/study_plan"
          className="whitespace-nowrap font-poppins font-light underline outline-none transition-opacity hover:bg-accent hover:text-white focus:bg-accent focus:text-white active:opacity-25">
          Course Planner
        </NavLink>{' '}
        and{' '}
        <NavLink
          to="/HKUCoursePlanner-Reviewer/view_program"
          className="whitespace-nowrap font-poppins font-light underline outline-none transition-opacity hover:bg-accent hover:text-white focus:bg-accent focus:text-white active:opacity-25">
          Syllabus Roadmap
        </NavLink>{' '}
        is quite limited. We would greatly appreciate your assistance in adding
        more syllabuses. If you are knowledgeable in JSON or interested in
        learning it, and believe in the value of this project, you can help by
        downloading the config and modifying it. After making modifications, you
        can test it by uploading your custom config. If everything works well,
        we would be delighted to hear from you on our{' '}
        <a
          href="https://github.com/Walter-Tong/Course_Planner_Config"
          className="cursor-pointer whitespace-nowrap underline outline-none transition-opacity hover:bg-accent hover:text-white focus:bg-accent focus:text-white active:opacity-25">
          dedicated GitHub page for the config
        </a>
        , or via{' '}
        <a
          href="mailto:walter19@connect.hku.hk"
          className="cursor-pointer underline outline-none transition-opacity hover:bg-accent hover:text-white focus:bg-accent focus:text-white active:opacity-25">
          email
        </a>
        !
      </p>
    </div>
  )
}

export default UploadExportFilePage
