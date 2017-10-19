import React from "react";

export default  class DisplayStripedTable extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillMount(){
		
		console.log(this.props.TableData)
		 }
	render(){
			return(
			<div class="panel panel-inverse" data-sortable-id="table-basic-4">
                        <div class="panel-heading">
                            <h4 class="panel-title">{this.props.Title}</h4>
                        </div>
                        <div class="panel-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        {
											this.props.TableHeader.map((TH,i)=>{
													return(
														<th key={i}>{TH}</th>
													)
												})
											}
                                    </tr>
                                </thead>
                                <tbody>
									
                                </tbody>
                            </table>
                        </div>
                    </div>
			)
		}
	}	