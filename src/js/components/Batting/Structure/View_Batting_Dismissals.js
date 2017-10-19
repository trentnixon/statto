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
		

// Variables
// Ints
var Count=0;
// Objects
var Main_Array_1=[],Main_Array_2=[], DismissalbyRuns=[], PositionOrder=[], SortPositions=[],GetRuns;


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class Batting_Dismissals extends React.Component {

		constructor() { super(); 
  	
			this.state = {
					dismissal_runs:'*',
				};
		  }
		
		onSiteChanged(e){
			
			console.log(e.currentTarget.value)
			this.setState({ dismissal_runs:e.currentTarget.value})	
	
		}
		
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
			
			
	/* ************************************************************************ */			
	UIObject(PlayerObject, Facts)
		{
		
			PositionOrder=[];
			SortPositions =[];
		
			PlayerObject.map((game,i)=>{
			
				PositionOrder.push(game.Batting_How_Out)
				SortPositions.push({
						dismissal:game.Batting_How_Out
					})
			})
		
		
		
			let SortableArray = PositionOrder.sort(function(a, b){
					var keyA = a.dismissal,
						keyB = b.dismissal;
					// Compare the 2 dates
					if(keyA < keyB) return -1;
					if(keyA > keyB) return 1;
					return 0;
				})	
		

			let PositionArray = this.foo(SortableArray.sort())
	
			console.log(PositionArray);
			Main_Array_1=[];
	
			PositionArray[0].map((position,i)=>{
			
					Main_Array_1.push({
						Dismissal_Type:PositionArray[0][i],	
						Dismissal:PositionArray[1][i],
					})
				
			})
			//console.log(Main_Array_1)
	}
		
			
	/* ************************************************************************ */	
	
	DismissalbyRuns(Player, dismissal_State){
		
		DismissalbyRuns=[]
		let duck=0, ten=0,twenty=0,thirty=0,forty=0,fifty=0,overfifty=0;
		let balls0=0, balls5=0, balls10=0, balls15=0, balls20=0, balls25=0, balls30=0, balls35=0, balls40=0, balls50=0, balls100=0
		console.log('Display this : ', dismissal_State)
		Player.map((game,i)=>{
		
				if(game.Batting_How_Out == dismissal_State || dismissal_State == '*')
					{
						// Dismissals by Runs
						switch (true) {
								case (0 == game.Runs_parsed):
									duck++
									break;
								case (game.Runs_parsed < 11):
									ten++
									break;
								case  (game.Runs_parsed < 21):
									twenty++
									break;
								case (game.Runs_parsed < 31):
									thirty++
									break;
								case (game.Runs_parsed < 41):
									forty++
									break;
								case (game.Runs_parsed < 50):
									fifty++
									break;
								case (game.Runs_parsed > 50):
									overfifty++
							}
						// Dismissals by Balls Faced
						//balls0=0, balls5=0, balls10=0, balls15=0, balls20=0, balls25=0, balls30=0, balls35=0, balls40=0, balls50=0, balls100=0
						switch (true) {
								case (0 == game.BallsFaced):
									balls0++
									break;
								case (game.BallsFaced < 6):
									balls5++
									break;
								case  (game.BallsFaced < 11):
									balls10++
									break;
								case (game.BallsFaced < 16):
									balls15++
									break;
								case (game.BallsFaced < 21):
									balls20++
									break;
								case (game.BallsFaced < 26):
									balls25++
									break;
								case (game.BallsFaced > 31):
									balls30++
									break
								case (game.BallsFaced > 36):
									balls35++
									break
								case (game.BallsFaced > 41):
									balls40++
									break
								case (game.BallsFaced > 50):
									balls50++
									break
								case (game.BallsFaced < 49):
									balls100++
									break
							}
						
				}
			})
			
		DismissalbyRuns.push(
		//balls0=0, balls5=0, balls10=0, balls15=0, balls20=0, balls25=0, balls30=0, balls35=0, balls40=0, balls50=0, balls100=0
			{Runs:'0 Runs',Num:duck, Balls:'0 balls' ,Dismissals:balls0},
			{Runs:'< 10 Runs',Num:ten, Balls:'< 5 balls' ,Dismissals:balls5},
			{Runs:'< 20 Runs',Num:twenty, Balls:'< 10 balls' ,Dismissals:balls10},
			{Runs:'< 30 Runs',Num:thirty, Balls:'< 15 balls' ,Dismissals:balls15},
			{Runs:'< 40 Runs',Num:forty, Balls:'< 20 balls' ,Dismissals:balls20},
			{Runs:'< 50 Runs',Num:fifty, Balls:'< 25 balls' ,Dismissals:balls25},
			{Runs:'> 50 Runs',Num:overfifty, Balls:'< 30 balls' ,Dismissals:balls30}
		)
			
		// console.log(DismissalbyRuns)
		return DismissalbyRuns;
	}
			
			
	/* ************************************************************************ */		
			
	componentWillMount(){ 
	
		// Set Vars		
		var PlayerObject = this.props.BATTING.BattingObject;
		var Facts = this.props.BATTING;

		//console.log(PlayerObject)
		this.UIObject(PlayerObject, Facts)
		
		console.log(this.state.dismissal_runs);
		GetRuns = this.DismissalbyRuns(PlayerObject, this.state.dismissal_runs);
		
	}

	shouldComponentUpdate(nextProps, nextState){ return true;}
    componentWillUpdate(nextProps, nextState){

	   //console.log(nextState.dismissal_runs)
	  GetRuns = this.DismissalbyRuns(nextProps.BATTING.BattingObject, nextState.dismissal_runs);
	  
	  if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	  }

	render () {
			return (
				<div id="stage">
					<h1 class="page-header">Career Dismissals</h1>
					
					<div class="col-md-12">
						<Stage_bar 
								Data={Main_Array_1} 
								title="Dismissals"
								XaxisLabel="Dismissal_Type"
								Bars="Dismissal"
								Color="#3498db"
						/>
					</div>
					<div class="col-md-6">
						<Stage_bar 
								Data={GetRuns} 
								title={"Runs per Dismissals - ( "+ this.state.dismissal_runs+" )"}
								XaxisLabel="Runs"
								Bars="Num"
								Color="#16a085"
						/>
					</div>
					<div class="col-md-6">
						<Stage_bar 
								Data={GetRuns} 
								title={"Balls per Dismissals - ( "+ this.state.dismissal_runs+" )"}
								XaxisLabel="Balls"
								Bars="Dismissals"
								Color="#16a085"
						/>
					</div>
					<div class="col-md-12">	
						<div class="panel panel-default">
							<div class="panel-body">
								<h4 class="text-center">Select a mode of Dismissal</h4>
								
								
								<div  class="col-md-1 nopadding" >
									<div class="checkbox">
										<label>
											<input 
												type="radio" 
												name="dismissal_type" 
                                   				value="*"
                                   				onChange={this.onSiteChanged.bind(this)} /> All
										</label>
									</div>
								</div>
						{
							this.props.UI.Dismissals.map((dismissal, i)=>{
								return (
									<div  class="col-md-1 nopadding" key={i}>
									<div class="checkbox">
									<label>
									<input 
											type="radio" 
											name="dismissal_type" 
                                   			value={dismissal} 
                                   			
                                   			onChange={this.onSiteChanged.bind(this)} /> {dismissal} 
									</label>
									</div>
									</div>
								)	
								})
							}
							</div>
						</div>
					</div>
				</div>
			)
	}
}