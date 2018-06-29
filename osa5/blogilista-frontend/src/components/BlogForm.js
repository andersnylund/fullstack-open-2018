import React from 'react';

class BlogForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			author: '',
			url: '',
		};	
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value, 
		});
	}

	render() {
		return (
			<div>
				<form method='post' onSubmit={(event) => this.props.onNewBlog(event, this.state.title, this.state.author, this.state.url)}>
					<table>
						<tbody>
							<tr>
								<td><label>Title</label></td>
								<td><input type='text' name='title' onChange={this.handleChange} /></td>
							</tr>
							<tr>
								<td><label>Author</label></td>
								<td><input type='text' name='author' onChange={this.handleChange} /></td>
							</tr>
							<tr>
								<td><label>Url</label></td>
								<td><input type='text' name='url' onChange={this.handleChange} /></td>
							</tr>
						</tbody>
					</table>
					<button type='submit'>Add blog</button>
				</form>
			</div>
		);
	}
}

export default BlogForm;