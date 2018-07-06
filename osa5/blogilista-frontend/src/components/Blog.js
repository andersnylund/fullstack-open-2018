import React from 'react';

class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false
		};
	}

	handleExpand = () => {
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	}

	render() {
		const blogStyle = {
			paddingTop: 10,
			paddingLeft: 2,
			border: 'solid',      
			borderWidth: 1,
			marginBottom: 5
		};

		const compact = () => {
			return (
				<div onClick={this.handleExpand}>
					{`${this.props.blog.title} by ${this.props.blog.author}`}
				</div>				
			);
		} 

		const expanded = () => {
			return (
				<div>
					<div onClick={this.handleExpand}>
						{`${this.props.blog.title} by ${this.props.blog.author}`}
					</div>
					<div>
						<a href={this.props.blog.url}>{this.props.blog.url}</a>
					</div>
					<div>
						{`${this.props.blog.likes} likes`}
						<button onClick={() => this.props.onLike(this.props.blog)}>Like</button>
					</div>
					<div>
						{`added by ${this.props.blog.user ? this.props.blog.user.name : 'unknown'}`}
					</div>
				</div>	
			);
		}
		
		return (
			<div style={blogStyle}>
				{this.state.isExpanded ? expanded() : compact()}
			</div>
		);
	}
}

export default Blog;
