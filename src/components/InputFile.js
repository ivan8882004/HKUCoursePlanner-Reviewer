import { useState } from "react"

function InputFile(){
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadJson, setUploadJson] = useState(null);

    const handleFileInput = (event) => {
        setUploadFile(event.target.files[0])
    }

    const handleUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            setUploadJson(JSON.parse(event.target.result))
        }
        fileReader.readAsText(uploadFile);
    }

    console.log(uploadJson);

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileInput} />
            <div>
                {uploadFile && <button onClick={handleUpload}>Upload</button>}
            </div>
        </div>
    )
}

export default InputFile;