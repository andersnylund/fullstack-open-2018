import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe.only('<Blog />', () => {
	it('defaults to compact and shows more info expanded', () => {
		const blog = {
			author: 'author',
			title: 'title',
			likes: 0,
			url: 'url'
		};

		const onLikeMock = jest.fn();
		const onDeleteMock = jest.fn();

		const blogComponent = shallow(<Blog blog={blog} onLike={onLikeMock} onDelete={onDeleteMock}/>);
		console.log(blogComponent.debug());

		let wrapper = blogComponent.find('.wrapper').text();
		expect(wrapper).toContain(blog.title);
		expect(wrapper).toContain(blog.author);
		expect(wrapper).not.toContain(blog.url);
		expect(wrapper).not.toContain('likes');

		blogComponent.find('.title').simulate('click');

		wrapper = blogComponent.find('.wrapper').text();
		expect(wrapper).toContain(blog.title);
		expect(wrapper).toContain(blog.author);
		expect(wrapper).toContain(blog.url);
		expect(wrapper).toContain('likes');

	});
});