function SemButton({setIsSemOne,isSemOne}) {

    const handleButtonClick = () => {
        setIsSemOne((prev) => !prev);
    };

    return (
        <div className='showSem'>
            <div className={(isSemOne ? "on" : "off")} onClick={() => {if(!isSemOne) {handleButtonClick()}}}>
                Sem1
            </div>
            <div className={(!isSemOne ? "on" : "off")} onClick={() => {if(isSemOne) {handleButtonClick()}}}>
                Sem2
            </div>
        </div>
    );

};

export default SemButton;