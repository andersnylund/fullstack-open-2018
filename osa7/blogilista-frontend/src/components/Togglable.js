import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

class Togglable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible, });
  }

  render() {
    return (
      <div>
        {this.state.visible ?
          <div>
            {this.props.children}
            <Button size='small' variant='contained' onClick={this.toggleVisibility} className={this.props.buttonClassName}>Cancel</Button>
          </div> :
          <div>
            <Button size='small' variant='contained' onClick={this.toggleVisibility} className={this.props.buttonClassName}>{this.props.buttonLabel}</Button>
          </div>
        }
      </div>
    );
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  buttonClassName: PropTypes.string.isRequired,
};

export default Togglable;