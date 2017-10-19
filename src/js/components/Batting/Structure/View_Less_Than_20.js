import React from "react";
import { connect } from "react-redux";

// Pies
import Create_Pie_Count_Years from "../../Global/pies/PieCountYears";
import Create_Pie_Count_item from "../../Global/pies/PieCountNumItems";
import Pie_IncrimentalAdd from "../../Global/pies/Pie_IncrimentalAdd"
// Tables
import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
import Stage_4Col_StripedTable from "../../Charts/Stage_4Col_StripedTable";
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

@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {

	/*Tables*/
	createTablePlayedCountYears(Player)
		{
			Table_Year_Count=[];
			Player.map((game,i)=>{	
					if(game.BallsFaced > 0 && game.Runs_parsed >= 0 && game.Runs_parsed < 20){			
						Table_Year_Count.push({col1:game.Date, col2:game.Against, col3:game.Runs, col4:game.BallsFaced})
					}
				})
			}
	
	/* Pies*/
	createPieCountYears(Player)
		{
			pie_yearcount=[];
			Player.map((game,i)=>{	
					
					if(game.BallsFaced > 0 && game.Runs_parsed >= 0 && game.Runs_parsed < 20){	
						//pie_yearcount.push({year:game.Date})
						pie_yearcount.push({year:game.Date,value:game.Runs_parsed})
					}
				})
				
			}
	
	/* Lines */
	CreateBolwingAverage(Player){
			Line_average=[]
			var CareerAverage = this.props.BATTING.Facts["0"].Bowling_Career_Average;
			Player.map((game,i)=>{			
				if(game.BallsFaced > 0 && game.Runs_parsed >= 0 && game.Runs_parsed < 20){
					Line_average.push({Date:game.Date,Average: game.Bowling_Career_Average,CareerAverage:CareerAverage});
				}
			})
		}
	
	/*Bars */
	CreateStackedBars(Player)
		{
			WicketsvsRuns=[];
			
			Player.map((game,i)=>{
				if(game.BallsFaced > 0 && game.Runs_parsed >= 0 && game.Runs_parsed < 20)
					{
						
						WicketsvsRuns.push({Against:game.Against,Runs:game.Runs_parsed,Balls:game.BallsFaced});		
				}
			})
	}
	
	
	
	componentWillMount(){ 
	
		// Set Vars
		var ThisObject = this.props.BATTING.BattingObject;
		Count = this.props.BATTING.Facts["0"].NotOuts;
		
		console.log(ThisObject)
		
		// Pie Charts
		this.createPieCountYears(ThisObject)
		
		// Line Chart
		this.CreateBolwingAverage(ThisObject)
		
		// Bar Charts
		this.CreateStackedBars(ThisObject)
		
		// Calculate Table
		TH=['Date','Team','Runs','Balls'];
		this.createTablePlayedCountYears(ThisObject)
		
		
		/*
		Overview=[
			{fact:"You have bowled against a total of "+TeamCount[0].length+" unique teams over "+yearcount[0].length+" years"},
			{fact: rows.length+" of which you have strolled to the crease more than once."},
			{fact: DisplayCommon.Team+" being the most common with "+DisplayCommon.count+" games"}
		]*/
	
	
		/* Create the Tab Layout */
	
		Tab_List = [
			{chart:<Stage_4Col_StripedTable 
							Title="Scores Less than 20" 
							TableHeader={TH} 
							TableData={Table_Year_Count} 
							DisplayClass="col-md-12" />},
		]
		
		Tab_Graph=[
			{chart:<Pie_IncrimentalAdd  
							Data={pie_yearcount} 
							Title="Scores Less than 20"
							bootstraps="col-md-6" />},
														
			{chart:<Create_Stacked_Bars 
							Data={WicketsvsRuns} 
							Title="Scores Less than 20" 
							Bar1="Runs" 
							Bar2="Balls" 
							XaxisLabel="Against"/>},
			
		]
	
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
						Title="Scores Less than 20" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}