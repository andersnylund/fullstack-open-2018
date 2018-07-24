import React from 'react';
import Blog from './Blog';
import PropTypes from 'prop-types';

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

BlogList.propTypes = {
	blogs: PropTypes.array.isRequired,
	onLike: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	user: PropTypes.any,
};

export default BlogList;