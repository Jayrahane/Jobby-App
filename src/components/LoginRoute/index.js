import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <>
        <label className="label-input" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="user-input"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label-input" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="user-input"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  successfullyGet = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureGet = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiurl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiurl, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.successfullyGet(data.jwt_token)
    } else {
      this.failureGet(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <div className="user-input-container">{this.renderUserName()}</div>
          <div className="user-input-container">{this.renderPassword()}</div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showSubmitError && <p className="error-msg-text">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
