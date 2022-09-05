import {useEffect} from "react"

const SelectAllCheckbox = ({userData, data, setData}) => {
  const handleChange = (e) => {
    const {name, checked} = e.target
    if (name === "allSelect") {
      let tempUser = data.map((elem) => {
        return {...elem, isChecked: checked}
      })
      setData(tempUser)
    } else {
      let tempUser = data.map((elem) =>
        elem?.name === name ? {...elem, isChecked: checked} : elem
      )
      setData(tempUser)
    }
  }
  useEffect(() => {
    setData(userData)
  }, [])
  return (
    <>
      <div className="col-6 mb-7">
        <input
          type="checkbox"
          className="form-check-input"
          name="allSelect"
          checked={!data.some((elem) => elem?.isChecked !== true)}
          onChange={handleChange}
        />
        <label className="form-check-label ms-2">
          <h4>Select All</h4>
        </label>
      </div>
      {data.map((elem, index) => (
        <div className="col-6 mb-7" key={index}>
          <input
            type="checkbox"
            className="form-check-input"
            name={elem?.name}
            checked={elem?.isChecked || false}
            onChange={handleChange}
          />
          <label className="form-check-label ms-2">{elem?.label}</label>
        </div>
      ))}
    </>
  )
}

export default SelectAllCheckbox
