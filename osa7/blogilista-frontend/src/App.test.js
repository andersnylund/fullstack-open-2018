import React from 'react';
import { mount, } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
jest.mock('./services/blogService.js');
import blogService from './services/blogService';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider, } from 'react-redux';

const middleWares = [ thunk, ];
const mockStore = configureStore(middleWares);
const store = mockStore({});

describe.skip('<App />', () => {
  let app;

  describe('when user is not logged in', () => {
    beforeAll(() => {
      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      );
      console.log(app.debug());
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
        name: 'Teuvo Testaaja',
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