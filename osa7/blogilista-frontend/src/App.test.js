import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
jest.mock('./services/blogService.js');
import blogService from './services/blogService';

describe('<App />', () => {
  let app;

  describe('when user is not logged in', () => {
    beforeAll(() => {
      app = mount(<App />);
    });
  
    it('renders only loginform', () => {
      app.update();
      const loginFormComponent = app.find('.loginForm');
      //console.log(loginFormComponent.debug());
      expect(loginFormComponent.text()).toContain('Login');
    });
  });

  describe('when user is logged in', () => {
    beforeAll(() => {
      const user = {
        username: 'tester',
        token: '123123123',
        name: 'Teuvo Testaaja'
      };
      window.localStorage.setItem('blogiListaUser', JSON.stringify(user));
      app = mount(<App />);
    });

    it('renders blogs', () => {
      app.update();
  
      const blogComponents = app.find(Blog);
      // console.log(blogComponents.debug());
      expect(blogComponents.length).toEqual(blogService.blogs.length);
    });
  });

  

});