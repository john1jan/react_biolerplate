import React from 'react';
// const ErrorPageContainer = require('../containers/ErrorPageContainer');

class DataWrapper extends React.Component {

  getChildContext() {
    return {
      data: this.props.data
    };
  }

  render() {
    if (typeof (this.props.data.data) != 'undefined') {
      if (typeof (this.props.data.data.error) == 'undefined') {
        return this.props.children;
      } else {
        return <div> Error</div>
      }
    } else {
      return this.props.children;
    }
  }

}

DataWrapper.childContextTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
    React.PropTypes.array
  ]).isRequired
};

export default DataWrapper;