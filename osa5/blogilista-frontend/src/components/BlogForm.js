import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ onNewBlog, onChange, title, author, url}) => {
	return (
		<div>
			<form method='post' onSubmit={(event) => onNewBlog(event, title, author, url)}>
				<table>
					<tbody>
						<tr>
							<td><label>Title</label></td>
							<td><input type='text' name='title' value={title} onChange={onChange} /></td>
						</tr>
						<tr>
							<td><label>Author</label></td>
							<td><input type='text' name='author' value={author} onChange={onChange} /></td>
						</tr>
						<tr>
							<td><label>Url</label></td>
							<td><input type='text' name='url' value={url} onChange={onChange} /></td>
						</tr>
					</tbody>
				</table>
				<button type='submit'>Add blog</button>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	onNewBlog: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default BlogForm;