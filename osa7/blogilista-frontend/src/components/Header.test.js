import React from 'react';
import { shallow, mount, } from 'enzyme';
import Header from './Header';
import { Button, } from '@material-ui/core';

describe('<Header />', () => {

  const user = {
    username: 'test',
  };

  const handleLogout = jest.fn();

  it('shows login info when user is logged in', () => {
    const headerComponent = shallow(<Header user={user} onLogout={handleLogout}></Header>);
    expect(headerComponent.html()).toContain('logged in');
  });

  it('does not show login info when user is logged in', () => {
    const headerComponent = shallow(<Header user={undefined} onLogout={handleLogout}></Header>);
    expect(headerComponent.html()).not.toContain('logged in');
  });

  it('handles the logout', () => {
    const headerComponent = mount(<Header user={user} onLogout={handleLogout}></Header>);
    // console.log(headerComponent.debug());
    const button = headerComponent.find(Button);
    button.simulate('click');
    expect(handleLogout.mock.calls.length).toEqual(1);
  });

});