import React from "react";

import Widget from "../../Global/Widget";
import Display_Pie_Chart from "../../Charts/PieChart";

export default class BasicStats extends React.Component {
	render () {
			
			return (
				<div id="Feeder">
					
					<div class="row">
						<div class="col-md-10">
							<h1 class="page-header" >{this.props.Title}</h1>
						</div>
						<div class="col-md-2">
							<p class="pull-right">Total: {this.props.WidgetCount}</p>
						</div>
					</div>
					
					<div class="row">
						<div class="col-md-4">
								<Display_Pie_Chart 
									title={this.props.PieTitle}
									Data={this.props.PieData}
								/>
						</div>
						<div class="col-md-8">
							<div id="table">
								<div class="panel panel-inverse" data-sortable-id="table-basic-4">
									<div class="panel-heading">
										<h4 class="panel-title">Overview</h4>
									</div>
									<div class="panel-body">
										<table class="table table-striped">
											<tbody>
												{
													this.props.Overview.map((fact,i)=>{
														return(
															<tr key={i}>
																<td>{fact.fact}</td>
															</tr>
															)
														})
													}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div id="table">
								<div class="panel panel-inverse" data-sortable-id="table-basic-4">
									<div class="panel-heading">
										<h4 class="panel-title">{this.props.TableTitle}</h4>
									</div>
									<div class="panel-body">
										<table class="table table-striped">
											<thead>
											   <tr>
													{
														this.props.TableHeader.map((head,i)=>{
																return(<td key={i}>{head}</td>)
															})
														}
											   </tr>
											</thead>
											<tbody>
												{this.props.TableData.reverse()}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
	}
}