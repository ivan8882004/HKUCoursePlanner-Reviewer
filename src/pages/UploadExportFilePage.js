import UploadFile from "../components/UploadFile";
import ExportFile from "../components/ExportFile";

function UploadExportFilePage() {
    return (
        <div className="UploadExportFilePage">
            <div>
                <div className="InfoFormSubTitle">
                    Upload File
                </div>
                <UploadFile />
            </div>
            <div>
                <div className="InfoFormSubTitle">
                    Export File
                </div>
                <ExportFile />
            </div>
        </div>
    )
}

export default UploadExportFilePage;