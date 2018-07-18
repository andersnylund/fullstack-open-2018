import React from 'react';
import { changeFilter } from '../reducers/filterReducer';

export default class Filter extends React.Component {
	handleChange = (event) => {
		event.preventDefault();
		this.props.store.dispatch(changeFilter(event.target.value));
	}
	render() {
		const style = {
			marginBottom: 10
		};

		return (
			<div style={style}>
				<div>Filter</div>
				<input onChange={this.handleChange}/>
			</div>
		);
	}
}