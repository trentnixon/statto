import React from "react";
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "Recharts";

export default  class DisplayBarChart extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	render(){
			return(
			<div class="panel panel-inverse" data-sortable-id="index-1">
				<div class="panel-heading">
					<h4 class="panel-title">{this.props.title}</h4>
				</div>
				<div class="panel-body">
					<ResponsiveContainer width="100%" height={350}>
					<BarChart 
						barCategoryGap="1%"
						stackOffset="silhouette"
						data={this.props.Data}
						margin={{top: 5, right: 0, left: 0, bottom: 5}}
					>
					
						<XAxis dataKey={this.props.XaxisLabel} />
						<YAxis dataKey={this.props.Bars}/>
						<CartesianGrid strokeDasharray="1 1"/>
						<Tooltip/>
						<Legend  />
						<Bar dataKey={this.props.Bars} fill={this.props.Color} />
					</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
			)
		}
	}	
	
	