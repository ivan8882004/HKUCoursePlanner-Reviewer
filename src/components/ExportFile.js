import { useSelector } from "react-redux"

function ExportFile() {
    const {courses} = useSelector((state) => {
        return state.courses
    })

    const {degrees, majors, minors} = useSelector((state) => {
        return state.programs
    })

    const config = {courses, degrees, majors, minors}

    const exportAsJSON = () => { //copy from gpt
        const jsonData = JSON.stringify(config);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'config.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <button onClick={exportAsJSON}>Export</button>
        </div>
    )
}

export default ExportFile