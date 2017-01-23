const React = require('react');
const Home = require('../components/Home/Home');

class HomeContainer extends React.Component {
  render() {
    return <div>
      <Home />
    </div>;
  }
}

module.exports = HomeContainer;