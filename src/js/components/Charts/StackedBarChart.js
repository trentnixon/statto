import React from "react";
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "Recharts";

export default  class StackedBarChart extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	render(){
			return(
			<div class="panel panel-inverse" data-sortable-id="index-1">
				<div class="panel-heading">
					<h4 class="panel-title">{this.props.title}</h4>
				</div>
				<div class="panel-body">
					<ResponsiveContainer width="100%" height={400}>
						<BarChart 
							
							data={this.props.Data}
							margin={{top: 5, right: 5, left: 5, bottom: 5}}
						>
						
						   		<XAxis dataKey={this.props.XaxisLabel} />
						   		<YAxis dataKey={this.props.Bars} />
						   		<CartesianGrid strokeDasharray="3 3"/>
						   		<Tooltip/>
						   		<Legend />
						  		<Bar dataKey={this.props.Bar2} stackId="a" fill="#82ca9d" />
								<Bar dataKey={this.props.Bar1} stackId="a" fill="#8884d8" />
						 </BarChart>
					</ResponsiveContainer>
				</div>
			</div>
			)
		}
	}