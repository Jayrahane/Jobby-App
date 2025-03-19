import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../HeaderRoute'
import JobsRouteCard from '../JobsRouteCard'
import FilterGroup from '../FilterGroup'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsRoute extends Component {
  state = {
    jobData: [],
    apiStatus: apiStatusConstant.initial,
    activeEmployId: '',
    activeSalaryId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {activeEmployId, activeSalaryId, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployId}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response) /// Just check that, I was successfuuly fetched data  or not!
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        location: eachData.location,
        id: eachData.id,
        jobDescription: eachData.job_description,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        jobData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="job-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="60" width="60" />
    </div>
  )

  renderJobsData = () => {
    const {jobData} = this.state
    const showJobList = jobData.length > 0

    return showJobList ? (
      <ul className="job-container">
        {jobData.map(eachJobData => (
          <JobsRouteCard
            jobsRouteCardDetails={eachJobData}
            key={eachJobData.id}
          />
        ))}
      </ul>
    ) : (
      <div className="no-job-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <p className="no-job-found-text">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobsData()
      case apiStatusConstant.inProgress:
        return this.renderLoading()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changeSalaryType = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobsData)
  }

  changeEmployeType = activeEmployId => {
    this.setState({activeEmployId}, this.getJobsData)
  }

  enterSearchInput = () => {
    this.getJobsData()
  }

  onChangeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  render() {
    const {activeEmployId, activeSalaryId, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="sorting-route-container">
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            activeEmployId={activeEmployId}
            activeSalaryId={activeSalaryId}
            searchInput={searchInput}
            changeSalaryType={this.changeSalaryType}
            changeEmployeType={this.changeEmployeType}
            enterSearchInput={this.enterSearchInput}
            onChangeSearchInput={this.onChangeSearchInput}
          />

          {this.renderAllJobs()}
        </div>
      </>
    )
  }
}

export default JobsRoute
