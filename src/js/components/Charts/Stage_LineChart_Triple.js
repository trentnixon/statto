import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from "Recharts";

var Height=400;
export default  class DisplayBarChart extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	
	render(){
			if(this.props.Height){Height=this.props.Height}
		
			return(
			<div class="panel panel-inverse" data-sortable-id="index-1">
				<div class="panel-heading">
					<h4 class="panel-title">{this.props.title}</h4>
				</div>
				<div class="panel-body">
					<ResponsiveContainer width="100%" height={Height}>
						<LineChart data={this.props.Data} margin={{top: 5, right: 0, left: 0, bottom: 5}}>
							<XAxis dataKey={this.props.XaxisLabel}/>
						   	<YAxis />
						   	<CartesianGrid strokeDasharray="3 3"/>
						   	<Tooltip />
						   	<Legend />
						   	<Line type="monotone" dataKey={this.props.Line1} stroke="#8884d8" dot={{r: 0}} activeDot={{r: 6}}/>
						   	<Line type="monotone" dataKey={this.props.Line2} stroke="#82ca9d" dot={{r: 0}} activeDot={{r: 6}}/>
							<Line type="monotone" dataKey={this.props.Line3} stroke="#ffc658" dot={{r: 0}} activeDot={{r: 6}}/>
						  	</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
			)
		}
	}	