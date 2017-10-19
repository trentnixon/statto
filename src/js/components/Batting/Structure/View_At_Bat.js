import React from "react";
import { connect } from "react-redux";

// Pies
import Create_Pie_Count_Years from "../../Global/pies/PieCountYears";
import Create_Pie_Count_item from "../../Global/pies/PieCountNumItems";
// Tables
import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
//Lines
import Create_Lines_Single from "../../Global/lines/Create_Lines_Single";
import Create_Lines_Double from "../../Global/lines/Create_Lines_Double";
import Create_Lines_Triple from "../../Global/lines/Create_Lines_Triple";
// Bars
import Create_Stacked_Bars from "../../Global/bars/Create_Stacked_Bars";



// Import to stage
import StatStage from "../../Global/StageBreakdown/";

// New Vars
var pie_yearcount=[],pie_Over_count=[], Table_Year_Count=[],TH=[], Tab_List,Tab_Graph, Count=0;
var Line_average=[], WicketsvsRuns=[], pieWinRatio=[];
// Calculate Table
TH=["Team","Games"]
		
@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {

	// Pie
	createPieCountYears(Player)
		{
			pie_yearcount=[];
			Player.map((game,i)=>{	
					
					if(game.BallsFaced > 0 ){	
						pie_yearcount.push({year:game.Date})
					}
				})
	}

	// Table
	createTablePlayedCountYears(Player)
		{
			Table_Year_Count=[];
			Player.map((game,i)=>{	
					if(game.BallsFaced > 0 ){			
						Table_Year_Count.push({year:game.Date, Team:game.Against})
					}
				})
			}
	
	
	
	CreateRunsvsBalls(Player)
		{
			WicketsvsRuns=[];
			
			Player.map((game,i)=>{
				if(game.BallsFaced > 0)
					{
						
						WicketsvsRuns.push({Against:game.Against,Runs_Scored:game.Runs_parsed,Balls_Faced:game.BallsFaced});		
				}
			})
	}
	
	
	
	createState(Data){
		// Calculate Table
		
		// Set Vars
		var ThisObject = Data.BattingObject;
		Count = Data.Facts["0"].NumInnings;
		// Pie Charts
		this.createPieCountYears(ThisObject)
		// Bar Charts
		this.CreateRunsvsBalls(ThisObject)
		// Tables
		this.createTablePlayedCountYears(ThisObject)
		
		Tab_List = [
			{chart:<Stage_Table_Count_Years 
							Title="Innings by Opposition (min 1 ball faced)" 
							TableHeader={TH} 
							TableRow={Table_Year_Count} 
							DisplayClass="col-md-12" />},
		]
		
		Tab_Graph=[
			{chart:<Create_Pie_Count_Years  
							Data={pie_yearcount} 
							Title="Over the Years"
							bootstraps="col-md-6" />},
														
			{chart:<Create_Stacked_Bars 
							Data={WicketsvsRuns} 
							Title="Over the Years - Runs vs Balls Faced" 
							Bar1="Runs_Scored" 
							Bar2="Balls_Faced" 
							XaxisLabel="Against"/>},
			
		]
		
	}
	
	componentWillMount(){ 
		// Create State		
		this.createState(this.props.BATTING)
		
		/*
		Overview=[
			{fact:"You have bowled against a total of "+TeamCount[0].length+" unique teams over "+yearcount[0].length+" years"},
			{fact: rows.length+" of which you have strolled to the crease more than once."},
			{fact: DisplayCommon.Team+" being the most common with "+DisplayCommon.count+" games"}
		]*/
	}

	shouldComponentUpdate(nextProps, nextState){ return true;}
	componentWillUpdate(nextProps, nextState){
		if(this.props.BATTING.Facts["0"].Batting_World_Rank != nextProps.BATTING.Facts["0"].Batting_World_Rank){
				nextProps.history.push('/'+nextProps.UI.PLAYER.LMSID+'/') 
		 }
	}
	
	render () {
			return (
				<div id="Stage">
					<StatStage 
						Title="Career Innings" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}