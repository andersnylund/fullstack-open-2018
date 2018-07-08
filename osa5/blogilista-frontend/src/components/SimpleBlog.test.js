import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe.only('<SimpleBlog />', () => {
	it('renders title, author and likes', () => {
		const blog = {
			title: 'Title',
			author: 'Author',
			likes: 2
		};

		const mockHandler = jest.fn();
		const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>);
		// console.debug(blogComponent.debug());

		const contentDiv = blogComponent.find('.content');
		expect(contentDiv.text()).toContain(blog.title);
		expect(contentDiv.text()).toContain(blog.author);

		const likeDiv = blogComponent.find('.likes');
		expect(likeDiv.text()).toContain(blog.likes);

	});
});