import React from "react";
import { connect } from "react-redux";

// component
	import Shell_Top_Panel from "./Shell_TopPanel";
	//Bars
		import Create_Stacked_Bars from "../../Global/bars/Create_Stacked_Bars";
	
	//Lines
		import Create_Lines_Single from "../../Global/lines/Create_Lines_Single";
		import Create_Lines_Double from "../../Global/lines/Create_Lines_Double";
		import Create_Lines_Triple from "../../Global/lines/Create_Lines_Triple";

// Set Comonent Arrays
	var WicketsvsRuns=[], Line_average=[], Line_StrikeRate=[],Line_WorldRanking=[];

@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	// Create Objects for Charts
	// Stacked Bars
	CreateWicketsvsRuns(Player)
		{
			WicketsvsRuns=[];
			Player.map((game,i)=>{
				if(game.Bowling_BallsBowled > 0)
					{
					WicketsvsRuns.push({Team:game.Against,Runs:game.Bowling_RunsConceded,Wickets:game.Bowling_WicketsTaken});		
				}
			})
		}
	
	// Lines Double
	CreateBolwingAverage(Player){
			
			Line_average=[]
			
			var Bowling_Career_Economy_Rate = this.props.BATTING.Facts["0"].Bowling_Career_Economy_Rate;
			
			Player.map((game,i)=>{			
				if(game.Bowling_BallsBowled > 0){
			
					Line_average.push({
							Date:game.Date,
							Economy_Rate: game.Bowling_Career_Economy_Rate,
							Career_Economy_Rate:Bowling_Career_Economy_Rate
						});
				}
			})
		}
	
	
	
	CreateStrikeRate(Player){
			Line_StrikeRate=[]
			var CareerAverage = this.props.BATTING.Facts["0"].Bowling_Career_StrikeRate;
			CareerAverage = parseFloat(CareerAverage);
			Player.map((game,i)=>{			
				if(game.Bowling_BallsBowled > 0 && game.Bowling_WicketsTaken > 0){
					Line_StrikeRate.push({Date:game.Date,StrikeRate:game.Bowling_strikeRate,CareerStrikeRate:CareerAverage});
				}
			})
		}
				
	CreateWorldRanking(Player){
			Line_WorldRanking=[]
			Player.map((game,i)=>{			
				if(game.Bowling_Rank != 0)
					{
						Line_WorldRanking.push({Date:game.Date,Rank:game.Bowling_Rank});
						}
			})
		}	
		
	
	// Mount Components	
	componentWillMount(){
		
		// Create Player Object
		var PlayerObject = this.props.BATTING.BattingObject;
		console.log(PlayerObject)
		// Create Stacked Bars
		this.CreateWicketsvsRuns(PlayerObject)
		// Line Chart
		this.CreateBolwingAverage(PlayerObject)
		this.CreateStrikeRate(PlayerObject)
		this.CreateWorldRanking(PlayerObject)
		
	}

	render () {
			
			return (
				<div>
					<Shell_Top_Panel />
					<div id="HomePanel">
					
						<Create_Stacked_Bars 
								Data={WicketsvsRuns} 
								Title="Wickets vs Runs" 
								Bar1="Runs" 
								Bar2="Wickets" 
								XaxisLabel="Team"/>
						
						<Create_Lines_Double 
								Data={Line_average} 
								Title="Career Economy Rate" 
								Line1="Economy_Rate" 
								Line2="Career_Economy_Rate" 
								XaxisLabel="Date"
								Height={300}/>
	
						<Create_Lines_Double 
								Data={Line_StrikeRate} 
								Title="Bowling Strike Rate - Career (Balls per Wicket)" 
								Line1="StrikeRate" 
								Line2="CareerStrikeRate" 
								XaxisLabel="Date"
								Height={300}/>					
						
						<Create_Lines_Single 
								Data={Line_WorldRanking} 
								Title="World Ranking - Progression" 
								Line1="Rank" 
								XaxisLabel="Date"
								Height={300}/>
					</div>
				</div>
			)
	}
}