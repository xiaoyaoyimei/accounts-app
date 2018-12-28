import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI'
export default class RecordForm extends Component{
	constructor() {
	    super();
		this.state={
			data:"",
			title:"",
			amount:""
		}
	}
	handleChange(event){
		let name,obj; 
		name=event.target.name;
		console.log(event.target.name);
		this.setState((obj = {},
			obj["" + name] = event.target.value,
			obj))

		
	}
	valid(){
		return this.state.data&&this.state.title&&this.state.amount
	}
	handleSubmit(event){
		event.preventDefault();
		var data={
			data:this.state.data,
			title:this.state.title,
			amount:this.state.amount
		}
		RecordsAPI.create(data).then(
			response=>this.props.handleNewRecord(response.data),
				
				
			this.setState({
				data:"",
				title:"",
				amount:""
			})
		).catch(error=>console.log(error.message))
		
	}
	render(){
		return (
		<form  className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
		<div className="form-group mr-1">
		<input  onChange={this.handleChange.bind(this)} value={this.state.data} placeholder="data" name="data" type="text" className="form-control"/>
		</div>
		<div className="form-group mr-1">
		<input onChange={this.handleChange.bind(this)} value={this.state.title} placeholder="title" name="title" type="text" className="form-control"/>
		</div>
		<div className="form-group mr-1">
		<input onChange={this.handleChange.bind(this)} value={this.state.amount} placeholder="amount" name="amount" type="text" className="form-control"/>
		</div>
		
		<button disabled={!this.valid()} className="btn btn-primary" type="submit"> creat</button>
		</form>)
	}
}