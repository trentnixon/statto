import React from "react";
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "Recharts";

let BarThis;

let Colors=['#3498db','#e67e22','#8e44ad','#16a085','#f1c40f','#c0392b','#2ecc71'];

export default  class StackedBarChart extends React.Component {

	componentWillMount(){ 
	
		console.log(this.props.loopthis)
		BarThis = this.props.loopthis.map((game,i)=>{
			return(
				<Bar key={i} dataKey={game} stackId="a" fill={Colors[i]} />
			)
		})
	}
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
						  		{BarThis}
						 </BarChart>
					</ResponsiveContainer>
				</div>
			</div>
			)
		}
	}