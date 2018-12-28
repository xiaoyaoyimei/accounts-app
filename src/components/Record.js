import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as RecordsAPI from '../utils/RecordsAPI'

class Record extends Component {
	constructor() {
	    super();
			this.state={
				edit:false
			};
	}
	handleToggle(){
		this.setState({
			edit:!this.state.edit
		})
	}
	handleEdit(event){
		event.preventDefault()
		const record={
			data:this.refs.data.value,
			title:this.refs.title.value,
			amount:this.refs.amount.value

		}
		RecordsAPI.update(this.props.record.id, record).then(
      response => {
				this.setState({	edit:false});
        this.props.handleEditRecord(this.props.record, response.data);
      }
    ).catch(
      error => console.log(error.message)
    )
	}
	handDelete(event){
		event.preventDefault()
		RecordsAPI.remove(this.props.record.id).then(
			response => {
				this.props.handleDeleteRecord(this.props.record);
			}
		).catch(
			error => console.log(error.message)
		)
	}
	recordRow(){
		return (
		<tr><td>{this.props.record.data}</td><td>{this.props.record.title}</td>
		<td>{this.props.record.amount}</td>
		<td >
		<button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>Edit</button>
		<button className="btn btn-danger" onClick={this.handDelete.bind(this)}>delete</button>
		</td></tr>
		);
	}
	recordForm(){
		return (
		<tr><td><input  ref="data" defaultValue={this.props.record.data} type="text" className="form-control"/></td>
		<td><input ref="title" defaultValue={this.props.record.title} type="text" className="form-control"/></td>
		<td><input ref="amount" defaultValue={this.props.record.amount} type="text" className="form-control"/></td>
		<td >
		<button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>update</button>
		<button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>cancel</button>
		</td></tr>
		);
	}
  render() {
		console.log(this.state.edit)
   if(this.state.edit){
		 return this.recordForm()	 
	 }else{
		 return this.recordRow()
	 }
  }
}

export default Record;

Record.propTypes={
	id:PropTypes.string,
	title:PropTypes.string,
	amount:PropTypes.number
}