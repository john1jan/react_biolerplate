const React = require('react');
const ReactRouter = require('react-router');

const HomePrelaunch = require('./containers/HomeContainer');


const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;

export const HOME = "/";
export const ALL = '*';

export const routes = (
  <Router history={browserHistory}>
    <Route path={HOME} component={HomePrelaunch} />
    
  </Router>
);

// <Route path={ALL} component={UrlNotFoundContainer} status={404} />