import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
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

  it('calls the handler when like is clicked', () => {
    const blog = {
      title: 'Title',
      author: 'Author',
      likes: 2
    };

    const mockHandler = jest.fn();
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>);
    // console.debug(blogComponent.debug());

    const button = blogComponent.find('button');
    button.simulate('click');
    button.simulate('click');

    expect(mockHandler.mock.calls.length).toEqual(2);
  });
});