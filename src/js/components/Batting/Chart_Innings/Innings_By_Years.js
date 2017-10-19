import React from "react";
import { connect } from "react-redux";
import  {PieChart, Pie, Legend,Tooltip, ResponsiveContainer } from "Recharts";

import Display_Pie_Chart from "../../Charts/PieChart";

var Years=[],Limit=0,NewArrays,data=[], year=[];
@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	foo(arr) {
		var a = [], b = [], prev;
		arr.sort();
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i] !== prev ) {
				a.push(arr[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = arr[i];
		}
		return [a, b];
	}
	componentWillMount(){ 
		this.props.BATTING.BattingObject.map((game,i)=>{
				var Year = game.Date.split('/');
				Years[i]= 20+Year[2];
			})
		
		NewArrays = this.foo(Years)
		Limit = NewArrays[0].length;	
		year=[];
		for (var i=0; i < Limit; i++) {
					year.push({name:NewArrays[0][i], value:NewArrays[1][i]});
			}
	}

	render () {
			
			return (
				<div id="PieChart">
					<Display_Pie_Chart 
						title="Innings by Years"
						Data={year}
					/>
				</div>
			)
	}
}