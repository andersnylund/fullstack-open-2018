import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, }) => {
	return (
		<div>
			<table> 
				<tbody>
					{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
				</tbody>
			</table>
		</div>
	);
};

export default BlogList;