import React from "react";
import { connect } from "react-redux";

import DisplayLineCart from "../../Charts/LineChart";
import DisplayBarChart from "../../Charts/BarChart";
import Display_Pie_Chart from "../../Charts/PieChart";

var id=0,Year=0;
var RunsvsBalls=[],BallsvsAverage=[], Pie=[],Years=[],PieArray=[],PieResults=[],YearsPlayed=[],TotalRunsbyYear=[];

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

	calculateYearTotals(Player, Year)
		{
			var ReturnTotal=0
			Player.map((game,i)=>{	
				var gameDate = game.Date.split('/');
				if(gameDate[2] == Year) {ReturnTotal = ReturnTotal+game.BallsFaced;}
			})
			return ReturnTotal;
	}	

	CalculatePie(Player)
		{
			var id=0;
			Player.map((game,i)=>{
					if(game.BallsFaced > 0 ){
								var Year = game.Date.split('/');
								YearsPlayed[id]= Year[2];
								id++;
							}
					})
				PieArray = this.foo(YearsPlayed)
				TotalRunsbyYear=[];
				PieArray[0].map((year,i)=>{
						var YearTotal = this.calculateYearTotals(Player,year)
						TotalRunsbyYear.push({name:'20'+year, value:YearTotal});
					})
			return TotalRunsbyYear;
	}
	
	componentWillMount(){ 

		RunsvsBalls=[];
		BallsvsAverage=[];
		var RUNS = this.props.BATTING;
		var BallAverage = this.props.BATTING.Facts["0"].BallsFaced/this.props.BATTING.Facts["0"].NumInnings
		BallAverage = BallAverage.toFixed(2);
		RUNS.BattingObject.map((game,i)=>{	
				if(game.BallsFaced > 0){
						// Runs vs Balls Faced
						RunsvsBalls.push({Date:game.Date,Runs:game.Runs_Total,BallsFaced:game.BallsFaced_Total});
						BallsvsAverage.push({Date:game.Date,Average:BallAverage,BallsFaced:game.BallsFaced});
					}
		})
		
		// Pie chart results	
		PieResults = this.CalculatePie(RUNS.BattingObject);
		

	}

	render () {
			
			return (
				<div id="HomePanel">
					<div class="row">
						<div class="col-md-6">
							<h1 class="page-header" >Career Balls Faced</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">Total: {this.props.BATTING.Facts["0"].BallsFaced}</p>
						</div>
					</div>
					
					<Display_Pie_Chart 
									title="Balls Faced by Year"
									Data={PieResults}
								/>
					
					<DisplayLineCart 
								Data={RunsvsBalls} 
								title="Total Runs vs Career Balls Faced"
								XaxisLabel="Date"
								Line1="Runs"
								Line2="BallsFaced"
							/>
					<DisplayLineCart 
								Data={BallsvsAverage} 
								title="Deliveries Faced vs Career Delivery Average"
								XaxisLabel="Date"
								Line1="BallsFaced"
								Line2="Average"
							/>
				</div>
			)
	}
}