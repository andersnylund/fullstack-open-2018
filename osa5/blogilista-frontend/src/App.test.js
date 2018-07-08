import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import BlogList from './components/BlogList';
jest.mock('./services/blog_service.js');
import blogService from './services/blog_service';

describe('<App />', () => {
	let app;
	
	beforeAll(() => {
		app = mount(<App />);
	});

	it('renders only loginform if user not logged in', () => {
		app.update();
		const loginFormComponent = app.find('.loginForm');
		//console.trace(loginFormComponent.debug());
		expect(loginFormComponent.text()).toContain('Login');
	});



});