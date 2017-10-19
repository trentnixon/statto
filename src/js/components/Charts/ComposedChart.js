import React from "react";
import {PropTypes} from "react";
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from "Recharts";

export default  class DisplayComposedChart extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	render(){
			return(
			<div class="panel panel-inverse" data-sortable-id="index-1">
				<div class="panel-heading">
					<h4 class="panel-title">{this.props.title}</h4>
				</div>
				<div class="panel-body">
					<ResponsiveContainer width="100%" height={400}>
						<ComposedChart data={this.props.Data}
							margin={{top: 5, right: 10, left: 10, bottom: 5}}>
						  <XAxis dataKey={this.props.XAxis}/>
						  <YAxis />
						  <Tooltip/>
						  <Legend/>
						  <CartesianGrid stroke='#f5f5f5'/>
						  <Bar dataKey={this.props.Bar} fill='#413ea0'/>
						  <Line type='monotone' dataKey={this.props.Line} stroke='#ff7300'/>
					   </ComposedChart>
					</ResponsiveContainer>
				</div>
			</div>
			)
		}
	}	