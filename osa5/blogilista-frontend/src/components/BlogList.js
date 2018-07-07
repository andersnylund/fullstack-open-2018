import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, onLike, onDelete, user }) => {
	
	const sorted = blogs.sort((a, b) => {
		return a.likes < b.likes;
	});
	
	return (
		<div>
			{sorted.map(blog => <Blog key={blog.id} blog={blog} user={user} onLike={onLike} onDelete={onDelete}/>)}
		</div>
	);
};

export default BlogList;