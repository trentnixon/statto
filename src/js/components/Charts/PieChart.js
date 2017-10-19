import React from "react";
import  {PieChart, Pie, Legend,Tooltip, ResponsiveContainer } from "Recharts";

const data01 = [{name: 'Caught', value: 1}, {name: 'Stumpings', value: 2}]
			   
export default  class Piechart extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState){ return true;}
	render(){
			return(
			<div class="panel panel-inverse" data-sortable-id="index-1">
				<div class="panel-heading">
					<h4 class="panel-title">{this.props.title}</h4>
				</div>
				<div class="panel-body">
					<ResponsiveContainer width="100%" height={200}>
					<PieChart >
						<Tooltip />
						<Legend />
	        			<Pie data={this.props.Data}  outerRadius={50} fill="#8884d8" label/>
       				</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
			)
		}
	}