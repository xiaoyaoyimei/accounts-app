import React, { Component } from 'react';

import Record  from './Record.js'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'
class Records extends Component {
	
	constructor() {
	    super();
			this.state={
				isLoader:false,
				error:null,
				
				records:[
				]
			}
			}
			componentDidMount(){
				RecordsAPI.getAll().then(
				response=>this.setState({records:response.data,isLoader:true}),
				
				).catch(error=>this.setState({isLoader:true,error}))
			}
    addRecord(record){
			this.setState({
				error:null,
				isLoader:true,
				records:[
					...this.state.records,
					record
				]
			})
		}
		 updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }
	deleteRecord(record){
		const recordIndex = this.state.records.indexOf(record);
		const newRecords =  this.state.records.filter((item, index) => index !==recordIndex)
		this.setState({
			records: newRecords
		});
	}
	credits(){
		let credits=this.state.records.filter((record)=>{
			return record.amount>=0
		})
		return credits.reduce((prev,curr)=>{
			return prev+Number.parseInt(curr.amount,0)
		},0)
	}
	debits(){
		let credits=this.state.records.filter((record)=>{
			return record.amount<0
		})
		return credits.reduce((prev,curr)=>{
			return prev+Number.parseInt(curr.amount,0)
		},0)
	}
	balance(){
		return this.credits()+this.debits()
	}
  render() {
		const{error,isLoader,records}=this.state;
		let recordsComponent;
		if(error){
			recordsComponent= <div>err:{error.message}</div>
		}else if(!isLoader){
			recordsComponent= <div>loading.....</div>
		}else{
			recordsComponent=(
		 
						<table className="table table-bordered">
					
						<thead><tr><td>Data</td><td>Title</td><td>Amount</td><td>Actions</td></tr></thead>
						<tbody>
						{records.map((record,i)=><Record  key={record.id} record={record} 
						handleEditRecord={this.updateRecord.bind(this)} 
						handleDeleteRecord={this.deleteRecord.bind(this)}/>)}
						
						</tbody>
					
						</table>
						
				)	
		
		}
	return (
			
			<div>
						<h2>Records</h2>
						<div className="row mb-3">
						<AmountBox amount={this.credits()}  text="Credit" type="success"/>
						<AmountBox amount={this.debits()}  text="Debt" type="danger"/>
						<AmountBox amount={this.balance()}  text="Balance" type="info"/>
										   </div>
						<RecordForm handleNewRecord={this.addRecord.bind(this)} />

				   {recordsComponent}
				   
						</div>
			);
  }
}

export default Records;
