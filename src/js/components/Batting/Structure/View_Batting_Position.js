import React from "react";
import { connect } from "react-redux";

// Import to stage
	import StatStage from "../../Global/StageBreakdown/";
// Import Components
	// Lines
		import Create_Lines_Single from "../../Global/lines/Create_Lines_Single";
		import Create_Lines_Double from "../../Global/lines/Create_Lines_Double";
		import Create_Lines_Triple from "../../Global/lines/Create_Lines_Triple";
	// Pies
		import Create_Pie_Count_Years from "../../Global/pies/PieCountYears";
		import Create_Pie_Count_Items from "../../Global/pies/PieCountNumItems";
	// Tables
		import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
		import Stage_Table_Count_Items from "../../Global/table/Stage_Table_Count_Items";
	// Bars
		import Stage_bar from "../../Charts/BarChart";
		import Triple_bar from "../../Charts/TripleBar";
		import Quad_bar from "../../Charts/QuadBar";
		import StackedBars from "../../Charts/StackedBarChart";
		import LoopedStackedBarChart from "../../Charts/LoopedStackedBarChart.js";

// Variables
// Ints
var Count=0;
// Objects
var Bar_1=[],Bar_2=[], BattingPositionOrder=[], BattingPositionsRuns=[];
let Dismissals=['Bowled','Caught','LBW','Not out','Stumped','Runout','NA']


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class Batting_Position extends React.Component {

			
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
			
			
			
			
				
			/* ************************* */
			/* Count  */
			/* ************************* */	
				
			CountRuns(Position,ArrayofPosition)
				{
					//console.log(Position)
					let CountItem=0
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) { CountItem = CountItem+game.Runs_parsed; }
					})
					// console.log(CountItem)
					return parseFloat(CountItem);		
			}	
				
				
			CountNotOuts(Position, ArrayofPosition)	{
			
					let CountItem = 0;
					ArrayofPosition.map((game,i)=>{
						
						if(game.position == Position) { 
							if(game.Runs.indexOf("*") != -1){CountItem++ }
						 }
					})
					return parseFloat(CountItem);
			}
				
			/* ************************* */
			/* Averages */
			/* ************************* */	
			createAverage(num,NO,Runs)
				{
					let BatNum = num-NO;
					if(BatNum == 0 ){ BatNum =1;}
					let Avg = Runs/BatNum;
					return parseFloat(Avg.toFixed(0));
			}	
			
			
			/* ************************* */
			/* Strike Rates */
			/* ************************* */
			createSR(Position, ArrayofPosition)
				{
					
					let CountItem = 0, Balls=0, Runs=0;
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) { 
							
							Runs = Runs + game.Runs_parsed
							Balls = Balls + game.Balls_Faced
						}
					})
				
					
					let StrikeRate = Runs/Balls*100;
					StrikeRate = StrikeRate.toFixed(2);
				
					//console.log(Runs, Balls, StrikeRate)
					
					return parseFloat(StrikeRate);
			
			}
			
			
			/* ************************* */
			/* W/L Ratios */
			/* ************************* */
			Winratio(Position, ArrayofPosition)
				{
				
				let CountItem = 0
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) { 
							if(game.playedFor == game.winner) {  CountItem++; }
						}
					})
				
					return CountItem;
				}
			Loseratio(Position, ArrayofPosition)
				{
				
				let CountItem = 0
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) { if(game.playedFor != game.winner) {  CountItem++; } }	
					})
				
					return CountItem;
				}
			/* ************************** */
			/* Over 50 ****************** */
			/* ************************* */
			Over50(Position, ArrayofPosition)
				{
				
				let CountItem = 0
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) { if(game.Runs_parsed > 49) {  CountItem++; } }	
					})
				
					return CountItem;
				}
			Under10(Position, ArrayofPosition)
				{
				
				let CountItem = 0
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) { if(game.Runs_parsed < 10) {  CountItem++; } }	
					})
				
					return CountItem;
				}
			/* ********************** */
			/* Highest Score per position*/
			/* ********************* */
			
			highestScores(Position, ArrayofPosition)
				{
				
					let CountItem = 0, highscore=0;
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) 
							{ if(game.Runs_parsed > highscore) {  highscore = game.Runs_parsed; } 
						}	
					})
				
					return highscore;
				}
			
			/* ********************** */
			/* Dismissals */
			byDismissal(Position, ArrayofPosition, type)
				{
					//Dismissal
					let CountItem = 0, CountInn=0;
					ArrayofPosition.map((game,i)=>{
						if(game.position == Position) 
							{ if(game.Dismissal == type) {  CountItem++ } 
							CountInn++
						}	
					})
					//console.log(CountInn, CountItem)
					//let percentage = CountItem/CountInn*100
					//return percentage.toFixed(0);
					return CountItem;
				}
			
	/* ************************************************************************ */		
			
	componentWillMount(){ 
	
		// Set Vars		
		var PlayerObject = this.props.BATTING.BattingObject;
		var Facts = this.props.BATTING;

		

		BattingPositionOrder=[];
		BattingPositionsRuns =[];
		
		PlayerObject.map((game,i)=>{
			
			BattingPositionOrder.push(game.Batting_Position)
			BattingPositionsRuns.push({
					position:game.Batting_Position, 
					Runs:game.Runs, 
					Runs_parsed:game.Runs_parsed, 
					playedFor:game.Game_Playing_For_ID, 
					winner:game.Game_Winner_ID,
					Batting_Average:Facts.Facts["0"].Average,
					Balls_Faced:game.BallsFaced,
					Dismissal:game.Batting_How_Out
				})
		
		})
		
		
		
	let BattingArray = BattingPositionsRuns.sort(function(a, b){
					var keyA = a.position,
						keyB = b.position;
					// Compare the 2 dates
					if(keyA < keyB) return -1;
					if(keyA > keyB) return 1;
					return 0;
				})	
		

	let PositionArray = this.foo(BattingPositionOrder.sort())
	
	Bar_1=[];
	
	PositionArray[0].map((position,i)=>{
			
			if(PositionArray[0][i] != 0)
				{
				
				Bar_1.push({
					Position:'Position: '+PositionArray[0][i], 
					Innings:PositionArray[1][i], 
					Runs:   this.CountRuns(PositionArray[0][i],BattingArray),
					NotOut: this.CountNotOuts(PositionArray[0][i],BattingArray),
					Average:this.createAverage(PositionArray[1][i], this.CountNotOuts(PositionArray[0][i],BattingArray),this.CountRuns(PositionArray[0][i],BattingArray)),
					GamesWon:this.Winratio(PositionArray[0][i],BattingArray),
					GamesLost:this.Loseratio(PositionArray[0][i],BattingArray),
					CareerAverage:parseFloat(Facts.Facts["0"].Average),
					StrikeRate:this.createSR(PositionArray[0][i],BattingArray),
					Over50:this.Over50(PositionArray[0][i],BattingArray),
					Under10:this.Under10(PositionArray[0][i],BattingArray),
					HighestScore:this.highestScores(PositionArray[0][i],BattingArray),
					Bowled:this.byDismissal(PositionArray[0][i],BattingArray,'Bowled'),
					Caught:this.byDismissal(PositionArray[0][i],BattingArray,'Caught'),
					LBW:this.byDismissal(PositionArray[0][i],BattingArray,'LBW'),
					Stumped:this.byDismissal(PositionArray[0][i],BattingArray,'Stumped'),
					Runout:this.byDismissal(PositionArray[0][i],BattingArray,'Run out'),
					Not_Out:this.byDismissal(PositionArray[0][i],BattingArray,'Not out'),					
				})
			}
		})
	}
	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){
		if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	}
	
	render () {
			return (
				<div id="stage">
					<h1 class="page-header">Career Batting Positions</h1>
					
					
					
					<div class="col-md-6">
						<Triple_bar 
								Data={Bar_1} 
								title="Overview"
								XaxisLabel="Position"
								Bar1="Innings"
								Bar2="Average"
								Bar3="NotOut"
								Color1="#3498db"
								Color2="#e67e22"
								Color3="#f1c40f"
						/>
					</div>
					
					<div class="col-md-6">
						<Stage_bar 
								Data={Bar_1} 
								title="Runs"
								XaxisLabel="Position"
								Bars="Runs"
								Color="#3498db"
						/>
					</div>
					
					<div class="col-md-12">
					<LoopedStackedBarChart 
							Data={Bar_1}
							title="Dismissals by Batting Position"
							XaxisLabel="Position"
							loopthis={Dismissals}
					/>
					</div>
					
					<div class="col-md-6">
						<Stage_bar 
								Data={Bar_1} 
								title="Highest Scores"
								XaxisLabel="Position"
								Bars="HighestScore"
								Color="#3498db"
						/>
					</div>
					
					<div class="col-md-6">
						<Stage_bar 
								Data={Bar_1} 
								title="Strike Rates"
								XaxisLabel="Position"
								Bars="StrikeRate"
								Color="#2ecc71"
						/>
					
					</div>
					
					
					
					
					<div class="col-md-12">
					<StackedBars 
						Data={Bar_1} 
								title="Win Ratio"
								XaxisLabel="Position"
								Bar1="GamesWon"
								Bar2="GamesLost"
								Color1="#3498db"
								Color2="#e67e22"
					
					/>
					</div>
					
					<div class="col-md-6">
					<Create_Lines_Double 
							Data={Bar_1} 
							Title="Average by Position" 
							Line1="CareerAverage"
							Line2="Average" 
							XaxisLabel="Position"
							Height={300}/>
					</div>
					<div class="col-md-6">
					<Create_Lines_Double 
							Data={Bar_1} 
							Title="50s vs failed" 
							Line1="Over50"
							Line2="Under10" 
							XaxisLabel="Position"
							Height={300}/>
					</div>
					
				</div>
			)
	}
}