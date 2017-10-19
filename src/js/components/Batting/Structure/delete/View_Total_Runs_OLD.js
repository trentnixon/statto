import React from "react";
import { connect } from "react-redux";

import DisplayLineCart from "../../Charts/LineChart";
import DisplayBarChart from "../../Charts/BarChart";
import Display_Pie_Chart from "../../Charts/PieChart";

var TotalRunsLine=[],TotalRunsBar=[],RunsvsStrike=[],YearsPlayed=[],TotalRunsbyYear=[],PieArray,Limit,PieResults, CareerRuns=0,CareerBalls=0;

@connect((store) =>{
		return{
			UI: store.UI,
			Player: store.PLAYER,
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
				if(gameDate[2] == Year) {ReturnTotal = ReturnTotal+game.Runs_parsed;}
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
		TotalRunsLine=[];
		TotalRunsBar=[];
		RunsvsStrike=[];
		CareerRuns=0;
		CareerBalls=0;
		console.log(this.props.BATTING.Facts["0"].TotalScore);
		
		var RUNS = this.props.BATTING;
		
		RUNS.BattingObject.map((game,i)=>{
				
				if(game.BallsFaced > 0){
						// Line graph: Runs and balls faced
						TotalRunsLine.push({Date:game.Date,Runs:game.Runs_parsed, Balls:game.BallsFaced});
						// Bar graph: Runs against Teams
						TotalRunsBar.push({Team:game.Against,Runs:game.Runs_parsed});		
						// Line Graph : Runs vs Strike Rate
						RunsvsStrike.push({Date:game.Date,StrikeRate:game.StrikeRate,Total:game.Runs_Total});
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
							<h1 class="page-header" >Career Runs</h1>
						</div>
						<div class="col-md-6">
							<p class="pull-right">Total: {this.props.BATTING.Facts["0"].TotalScore}</p>
						</div>
					</div>
					
					<Display_Pie_Chart 
						title="Runs by Years"
						Data={PieResults}
					
					/>
					<DisplayLineCart 
								Data={TotalRunsLine} 
								title="Career Runs - By Date"
								XaxisLabel="Date"
								Line1="Runs"
								Line2="Balls"
							/>
					<DisplayBarChart 
								Data={TotalRunsBar} 
								title="Career Runs - By teams"
								XaxisLabel="Team"
								Bars="Runs"
								Line2=""
								Color="#ff5b57"
							/>
					<DisplayLineCart 
								Data={RunsvsStrike} 
								title="Runs vs Strike Rate"
								XaxisLabel="Date"
								Line1="Total"
								Line2="StrikeRate"
							/>
				</div>
			)
	}
}