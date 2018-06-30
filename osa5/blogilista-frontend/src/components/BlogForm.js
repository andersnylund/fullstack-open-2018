import React from 'react';

const BlogForm = (props) => {
	return (
		<div>
			<form method='post' onSubmit={(event) => props.onNewBlog(event, props.title, props.author, props.url)}>
				<table>
					<tbody>
						<tr>
							<td><label>Title</label></td>
							<td><input type='text' name='title' value={props.title} onChange={props.onChange} /></td>
						</tr>
						<tr>
							<td><label>Author</label></td>
							<td><input type='text' name='author' value={props.author} onChange={props.onChange} /></td>
						</tr>
						<tr>
							<td><label>Url</label></td>
							<td><input type='text' name='url' value={props.url} onChange={props.onChange} /></td>
						</tr>
					</tbody>
				</table>
				<button type='submit'>Add blog</button>
			</form>
		</div>
	);
};

export default BlogForm;