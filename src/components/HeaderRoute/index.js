import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>

      <ul className="nav-content">
        <li className="nav-items">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-items">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>

      <button type="button" className="logOut-btn" onClick={onLogoutBtn}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
