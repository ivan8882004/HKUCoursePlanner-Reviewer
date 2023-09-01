import ReactSlider from "react-slider";
import { useContext } from "react";
import TableContext from "../../context/SettingsProvider";

function RangeSlider () {

    const {hour, setHour} = useContext(TableContext);
  
    const handleChange = (newValues) => {
        setHour(newValues);
    };
  
    return (
      <div>
        <br></br>
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="thumb"
            trackClassName="track"
            defaultValue={[8, 19]}
            max={23} min={8}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            pearling
            minDistance={1}
            onChange={handleChange}
/>
        <div>{hour[0]}:30-{hour[1]}:20</div>
      </div>
    );
  };
  
  export default RangeSlider;