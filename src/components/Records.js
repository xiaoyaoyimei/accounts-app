import React, { Component } from 'react';

import Record  from './Record.js'
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'
class Records extends Component {
	
	constructor() {
		console.log('fff ')
	    super();
			this.state={
				isLoader:false,
				error:null,
				
				records:[
				]
			}
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
// 		let credits=this.state.records.filter((record)=>{
// 			return record.amount>=0
// 		})
// 
// 		return credits.reduce((prev,curr)=>{
// 			return prev+Number.parseInt(curr.amount,0)
// 		},0)
	}

	balance(){
		//return this.credits()+this.debits()
	}
	 componentWillMount() {
    console.log("Component will mount");
  }

  componentDidMount() {
     console.log("Component did mount");
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
			this.debits()
  }
	 debits = () => {
		console.log(this.state.records)
		let credits=this.state.records.filter((record)=>{
			return record.amount<0
		})
			console.log(credits)	
		return credits.reduce((prev,curr)=>{return prev+Number.parseInt(curr.amount,0)},0)
	}
  componentWillReceiveProps(nextProps) {
    console.log('Component will receive props', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Component should update', nextProps, nextState);
    if (nextState.status === 1) {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Component will update', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update', prevProps, prevState);
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
	  console.log('')
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
						
							<AmountBox amount={this.debits()}  text="Debt" type="danger"/>
			
						</div>
						<RecordForm handleNewRecord={this.addRecord.bind(this)} />

				   {recordsComponent}
				   
						</div>
			);
  }
}

export default Records;
