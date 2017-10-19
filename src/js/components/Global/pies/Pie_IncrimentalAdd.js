import React from "react";
import { connect } from "react-redux";

import Display_Pie_Chart from "../../Charts/PieChart";
import Display_Striped_Table from "../../Charts/Stage_StripedTable";

var Years=[],year=[],NewArrays,TotalbyYear=[],TH=["Year","Value"];

@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class Pie_IncrimentalAdd extends React.Component {
	
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

	calculateYearTotals(Player, Year)
		{
			var ReturnTotal=0
			Player.map((game,i)=>{	
				var gameDate = game.year.split('/');
				if(gameDate[2] == Year) {ReturnTotal = ReturnTotal+1}
			})
			return ReturnTotal;
	}
	
	CalculatePie(Player)
		{
				var id=0,PieArray,YearTotal,PieDate;
				
				TotalbyYear=[];
				
				Player.map((game,i)=>{
						if(game.value > 0 ){
								var Year = game.year.split('/');
								Years[id]= Year[2];
								id++;
							}
					})

				PieArray = this.foo(Years)
				
				PieArray[0].map((year,i)=>{
							YearTotal = this.calculateYearTotals(Player,year)
							PieDate = parseInt(20+PieArray[0][i]);
							TotalbyYear.push({name:PieDate, value:YearTotal});
				})
				return TotalbyYear;
			}
	
	componentWillMount(){ 
		var yearcount = this.CalculatePie(this.props.Data)
	}
	render () {
			return (
				<div class="row">
					<div class="col-md-6">
						<Display_Striped_Table
							
							TableHeader={TH} 
							TableData={TotalbyYear} 
							Title={this.props.Title} 
							 />
					</div>
					<div class="col-md-6">
						<Display_Pie_Chart title={this.props.Title} Data={TotalbyYear} />
					</div>
				</div>
			)
	}
}