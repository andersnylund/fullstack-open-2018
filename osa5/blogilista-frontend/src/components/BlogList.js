import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, onLike }) => {
	return (
		<div>
			{blogs.map(blog => <Blog key={blog.id} blog={blog} onLike={onLike}/>)}
		</div>
	);
};

export default BlogList;