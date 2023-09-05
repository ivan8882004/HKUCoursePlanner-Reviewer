import { useContext } from "react";
import TableContext from "../../context/SettingsProvider";
import { useSelector } from "react-redux";

function ImportSettingButton() {
    const { importSetting, setImportSetting } = useContext(TableContext);

    const { plan } = useSelector((state) => {
        return state.studyPlan
    })

    const numberOfYear = Math.ceil((plan.length - 1)/3)

    let content = [];

    for (let i = 0; i < numberOfYear; i++) {
        content.push(
            <div className={((importSetting === i + 1) ? "on" : "off")} onClick={() => setImportSetting(i + 1)} key={i}>
                Y{i + 1}
            </div>
        )
    }
    
    

    return (
        <div className="importSettingButton">
            Import Year from Course Planner:
            <div className="buttons">
                {content}
            </div>
        </div>
    )
}

export default ImportSettingButton;