function SemButton({ setIsSemOne, isSemOne }) {
  const handleButtonClick = () => {
    setIsSemOne(!isSemOne)
  }

  return (
    <div className="mb-2 flex space-x-2">
      <div
        className={
          'flex w-8 justify-center border-2 border-accent p-0.5 font-light' +
          (isSemOne
            ? ' bg-accent text-white'
            : ' cursor-pointer hover:bg-accent hover:text-white')
        }
        onClick={() => {
          if (!isSemOne) {
            handleButtonClick()
          }
        }}>
        1
      </div>
      <div
        className={
          'flex w-8 justify-center border-2 border-accent p-0.5 font-light' +
          (isSemOne
            ? ' cursor-pointer hover:bg-accent hover:text-white'
            : ' bg-accent text-white')
        }
        onClick={() => {
          if (isSemOne) {
            handleButtonClick()
          }
        }}>
        2
      </div>
    </div>
  )
}

export default SemButton
