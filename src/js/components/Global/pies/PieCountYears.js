import React from "react";
import { connect } from "react-redux";

import Display_Pie_Chart from "../../Charts/PieChart";
import Display_Striped_Table from "../../Charts/Stage_StripedTable";


var Years=[],year=[],NewArrays,Limit,yearcount,TH=["Year","Games"];
var Bootstraps="col-md-12"

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

	
	CalculatePie(Player)
		{
				var id=0;
				Player.map((game,i)=>{
					var Year = game.year.split('/');
					Years[id]= 20+Year[2];
					id++;
				})

				NewArrays = this.foo(Years)
				Limit = NewArrays[0].length;	
				year=[];
				for (var i=0; i < Limit; i++) {
							year.push({name:NewArrays[0][i], value:NewArrays[1][i]});
					}
				return NewArrays;
			}	
	componentWillMount(){  
		var yearcount = this.CalculatePie(this.props.Data) 
	
		if(this.props.bootstraps){ Bootstraps =this.props.bootstraps }
	}
	render () {
		
			console.log(year)
		
			return (
				<div class="row">
					<div class="col-md-6">
						<Display_Striped_Table
							
							TableHeader={TH} 
							TableData={year} 
							Title={this.props.Title} 
							 />
					</div>
					<div class="col-md-6">
						<Display_Pie_Chart title={this.props.Title} Data={year} />
					</div>
				</div>
			)
	}
}