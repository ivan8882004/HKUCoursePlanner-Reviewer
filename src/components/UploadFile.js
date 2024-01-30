import { useState } from 'react'
import { setCourses, setDegrees, setMajors, setMinors } from '../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UploadFile() {
  const dispatch = useDispatch()
  const [uploadFile, setUploadFile] = useState(null)
  const navigate = useNavigate()

  const handleFileInput = event => {
    setUploadFile(event.target.files[0])
  }

  const handleUpload = () => {
    const fileReader = new FileReader()
    fileReader.onload = event => {
      handleSet(JSON.parse(event.target.result))
    }
    fileReader.readAsText(uploadFile)
    navigate('/HKUCoursePlanner-Reviewer/')
  }

  const handleSet = uploadJson => {
    dispatch(setCourses(uploadJson.courses))
    dispatch(setDegrees(uploadJson.degrees))
    dispatch(setMajors(uploadJson.majors))
    dispatch(setMinors(uploadJson.minors))
  }

  return (
    <div>
      Upload Config
      <div className="flex space-x-2">
        <label className="z-10 w-40 cursor-pointer border-2 border-accent bg-white p-0.5 px-2 text-accent transition-opacity hover:bg-accent hover:text-white active:opacity-50">
          CHOOSE FILE
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileInput}
          />
        </label>
        {uploadFile && (
          <button
            onClick={handleUpload}
            className="animate__animated animate__fadeInLeft animate__faster cursor-pointer border-2 border-accent p-0.5 px-2 text-accent transition-opacity animation-delay-150 hover:bg-accent hover:text-white active:opacity-50">
            UPLOAD
          </button>
        )}
      </div>
    </div>
  )
}

export default UploadFile
