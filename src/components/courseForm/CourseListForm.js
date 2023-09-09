function CourseListForm({ index, list, setter }) {
  const inputsField = list.map((item, index) => {
    let value
    if (Array.isArray(item)) {
      value = item.join('&')
    } else {
      value = item
    }

    const handleInputChange = event => {
      setter([
        ...list.slice(0, index),
        event.target.value,
        ...list.slice(index + 1),
      ])
    }

    return (
      <div key={index} className="InfoList">
        <input type="text" value={value} onChange={handleInputChange}></input>
        <button
          type="button"
          onClick={() =>
            setter([...list.slice(0, index), ...list.slice(index + 1)])
          }>
          X
        </button>
      </div>
    )
  })

  return (
    <>
      <td>{'Pre-reg list ' + (index + 1) + ':'}</td>
      <td>{inputsField}</td>
      <td>
        <button type="button" onClick={() => setter([...list, ''])}>
          Add course
        </button>
      </td>
    </>
  )
}

export default CourseListForm
