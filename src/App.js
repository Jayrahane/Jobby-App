import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/LoginRoute'
import Home from './components/HomeRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetails from './components/JobItemDetailsRoute'
import NotFound from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
