import { useState } from "react"
import { setCourses, setDegrees, setMajors, setMinors } from "../store";
import { useDispatch } from "react-redux";

function UploadFile(){
    const dispatch = useDispatch();
    const [uploadFile, setUploadFile] = useState(null);

    const handleFileInput = (event) => {
        setUploadFile(event.target.files[0])
    }

    const handleUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            handleSet(JSON.parse(event.target.result))
        }
        fileReader.readAsText(uploadFile);
    }

    const handleSet = (uploadJson) => {
        dispatch(setCourses(uploadJson.courses))
        dispatch(setDegrees(uploadJson.degrees))
        dispatch(setMajors(uploadJson.majors))
        dispatch(setMinors(uploadJson.minors))
    }

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileInput} />
            <div>
                {uploadFile && <button onClick={handleUpload}>Upload</button>}
            </div>
        </div>
    )
}

export default UploadFile;