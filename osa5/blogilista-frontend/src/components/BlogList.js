import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, onLike }) => {
	
	const sorted = blogs.sort((a, b) => {
		return a.likes < b.likes;
	});
	
	return (
		<div>
			{sorted.map(blog => <Blog key={blog.id} blog={blog} onLike={onLike}/>)}
		</div>
	);
};

export default BlogList;