import ProfileCard from '../ProfileDetails'
import './index.css'

const FilterGroup = props => {
  const renderEmployeList = () => {
    const {employmentTypesList, changeEmployeType, activeEmployId} = props

    return employmentTypesList.map(employe => {
      const isChecked = activeEmployId.includes(employe.employmentTypeId)
      const onClickEmployeItem = () =>
        changeEmployeType(employe.employmentTypeId)

      return (
        <div className="responsive-container">
          <input
            type="checkbox"
            className="input-field"
            id="emlpoyee-label"
            onClick={onClickEmployeItem}
            checked={isChecked}
          />
          <label className="label-input" htmlFor="emlpoyee-label">
            {employe.label}
          </label>
        </div>
      )
    })
  }

  const renderEmployeFilterList = () => (
    <div className="employment-type-container">
      <h1 className="employment-type-heading">Type of Employement</h1>
      <ul className="employee-type-list-container">{renderEmployeList()}</ul>
    </div>
  )

  const renderSalaryList = () => {
    const {salaryRangesList, changeSalaryType, activeSalaryId} = props

    return salaryRangesList.map(salary => {
      const isChecked = activeSalaryId.includes(salary.salaryRangeId)
      const onClickSalaryItem = () => changeSalaryType(salary.salaryRangeId)

      return (
        <div className="responsive-container">
          <input
            type="checkbox"
            className="input-field"
            id="salary-label"
            onClick={onClickSalaryItem}
            checked={isChecked}
          />
          <label className="label-input" htmlFor="salary-label">
            {salary.label}
          </label>
        </div>
      )
    })
  }

  const renderSalaryFilterList = () => (
    <div className="salary-range-container">
      <h1 className="salary-range-heading">Salary Range</h1>
      <ul className="salary-range-list-container">{renderSalaryList()}</ul>
    </div>
  )

  return (
    <div className="render-filter-container">
      <ProfileCard />
      <hr className="horizontal-line" />
      {renderEmployeFilterList()}
      <hr className="horizontal-line" />
      {renderSalaryFilterList()}
    </div>
  )
}

export default FilterGroup
