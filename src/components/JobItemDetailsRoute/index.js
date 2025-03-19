import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../HeaderRoute'
import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: {},
    jobSimilarItemData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    id: data.id,
    employmentType: data.employment_type,
    jobDescription: data.job_description,

    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),

    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
  })

  getFormatSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarData = data.similar_jobs.map(eachData =>
        this.getFormatSimilarData(eachData),
      )
      console.log(updatedData)
      this.setState({
        jobItemData: updatedData,
        jobSimilarItemData: updatedSimilarData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <button
        type="button"
        id="button"
        className="job-item-failure-button"
        onClick={this.getJobData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobItemData, jobSimilarItemData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobItemData

    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-details-view-container">
        <div className="job-item">
          <div className="job-title-location-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="comapany-logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-heading">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-employee-container">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-heading">{location}</p>
                </div>
                <div className="employee-type-container">
                  <BsFillBriefcaseFill className="brief-case-icon" />
                  <p className="employee-type-heading">{employmentType}</p>
                </div>
              </div>
              <p className="package-heading">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-heading">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="description-text">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {jobSimilarItemData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobDetailsView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
