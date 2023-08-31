import React, { useState } from 'react';
import { useContext } from 'react';
import TableContext from '../context/SettingsProvider';

function DayButton({ day }) {

    const { add_drop_day } = useContext(TableContext);

    const [isPressed, setIsPressed] = useState(true);

    const handleButtonClick = () => {
        setIsPressed(!isPressed);
        add_drop_day(day);
    };

    return (
        <button
            style={{ backgroundColor: isPressed ? 'yellow' : 'green' }}
            onClick={handleButtonClick}>
            {day}
        </button>
    );

};

export default DayButton;