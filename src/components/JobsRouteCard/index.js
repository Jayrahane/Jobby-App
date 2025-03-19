import {Link} from 'react-router-dom'
import {FcRating} from 'react-icons/fc'
import {MdWork, MdLocationOn} from 'react-icons/md'

import './index.css'

const JobsRouteCard = props => {
  const {jobsRouteCardDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
    location,
    id,
  } = jobsRouteCardDetails

  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-route-card-container">
        <div className="title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="mini-title-container">
            <h1 className="title-heading">{title}</h1>
            <div className="rating-container">
              <FcRating className="rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-emlpoyye-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
          </div>

          <div className="emlpoyye-container">
            <MdWork className="work-icon" />
            <p className="type">{employmentType}</p>
          </div>
        </div>
        <p className="salary">{packagePerAnnum}</p>

        <hr className="horizontal-line-card" />
        <p className="description-name">Description</p>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobsRouteCard
