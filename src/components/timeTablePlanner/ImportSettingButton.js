import { useContext } from "react";
import TableContext from "../../context/SettingsProvider";
import { useSelector } from "react-redux";

function ImportSettingButton() {
    const { importSetting, setImportSetting } = useContext(TableContext);

    const { plan } = useSelector((state) => {
        return state.studyPlan
    })

    const numberOfYear = Math.ceil((plan.length - 1)/3)

    let dropDownContent = [];

    for (let i = 0; i < numberOfYear; i++) {
        dropDownContent.push(
            <option value={i + 1} key={i}>{"Year " + (i + 1)}</option>
        )
    }
    
    console.log(importSetting)

    return (
        <div>
            Year:
            <select onChange={(event) => setImportSetting(event.target.value)}>
                <option value={importSetting}>--</option>
                {dropDownContent}
            </select>
        </div>
    )
}

export default ImportSettingButton;