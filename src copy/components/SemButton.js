import React, { useState } from 'react';

function SemButton({setIsSemOne,isSemOne}) {

    const handleButtonClick = () => {
        setIsSemOne((prev) => !prev);
    };

    return (
        <div className='showSem'>
            <button
                style={{ backgroundColor: isSemOne ? 'yellow' : 'green' }}
                onClick={handleButtonClick}>
                Sem 1
            </button>
            <button
                style={{ backgroundColor: isSemOne ? 'green' : 'yellow' }}
                onClick={handleButtonClick}>
                Sem 2
            </button>
        </div>
    );

};

export default SemButton;