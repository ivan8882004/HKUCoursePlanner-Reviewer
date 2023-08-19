import { PiArrowFatRightFill } from "react-icons/pi";

function PreregGraph({ listItem }) {
    const content = listItem.isPrereg.map((item, index) => {
        return <PreregGraph listItem={item} key={index} />
    })

    return (
        <div className="CourseBox">
            <div>
                {listItem.extraMessage.length !== 0 && <div className="CourseBoxSubTitle">
                    with
                </div>}
                <div className="CourseBoxPrereg">
                    {listItem.extraMessage}
                </div>
            </div>
            <div>
                <div className="CourseBoxName">
                    {listItem.name}
                </div>
                <div className="CourseBoxFullName">
                    {listItem.fullName}
                </div>
            </div>
            <div>
                {listItem.isPrereg.length !== 0 && <PiArrowFatRightFill />}
            </div>
            {listItem.isPrereg.length !== 0 && <div className="CourseBoxIsPrereg">
                {content}
            </div>}
        </div>
    )
}

export default PreregGraph;