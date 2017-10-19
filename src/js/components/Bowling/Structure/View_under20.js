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

	createTablePlayedCountYears(Player)
		{
			Table_Year_Count=[];
			Player.map((game,i)=>{	
					if(game.Bowling_RunsConceded < 21 && game.Bowling_OversBowled_parsed > 0 ){			
						Table_Year_Count.push({col1:game.Date, col2:game.Against, col3:game.Bowling_OversBowled, col4:game.Bowling_Figures})
					}
				})
			}
	
	
	createPieCountYears(Player)
		{
			pie_yearcount=[];
			Player.map((game,i)=>{	
					
					if(game.Bowling_RunsConceded < 21 && game.Bowling_OversBowled_parsed > 0 ){	
						//pie_yearcount.push({year:game.Date})
						pie_yearcount.push({year:game.Date,value:game.Bowling_RunsConceded})
					}
				})
				
			}
	
	CreateBolwingAverage(Player){
			Line_average=[]
			var CareerAverage = this.props.BATTING.Facts["0"].Bowling_Career_Average;
			Player.map((game,i)=>{			
				if(game.Bowling_BallsBowled > 0){
					Line_average.push({Date:game.Date,Average: game.Bowling_Career_Average,CareerAverage:CareerAverage});
				}
			})
		}
	
	
	CreateWicketsvsRuns(Player)
		{
			WicketsvsRuns=[];
			
			Player.map((game,i)=>{
				if(game.Bowling_RunsConceded < 21 && game.Bowling_OversBowled_parsed > 0)
					{
						
						WicketsvsRuns.push({GameDate:game.Date,Runs:game.Bowling_RunsConceded,Wickets:game.Bowling_WicketsTaken});		
				}
			})
	}
	
	
	
	componentWillMount(){ 
	
		// Set Vars
		var ThisObject = this.props.BATTING.BattingObject;
		Count = this.props.BATTING.Facts["0"].Bowling_under20;
		
		// Pie Charts
		this.createPieCountYears(ThisObject)
		
		// Line Chart
		this.CreateBolwingAverage(ThisObject)
		
		// Bar Charts
		this.CreateWicketsvsRuns(ThisObject)
		
		// Calculate Table
		TH=['Date','Team','Overs','Figures'];
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
							Title="Bowling figures < 20 runs" 
							TableHeader={TH} 
							TableData={Table_Year_Count} 
							DisplayClass="col-md-12" />},
		]
		
		Tab_Graph=[
			{chart:<Pie_IncrimentalAdd  
							Data={pie_yearcount} 
							Title="Bowling figures < 20 runs"
							bootstraps="col-md-6" />},
														
			{chart:<Create_Stacked_Bars 
							Data={WicketsvsRuns} 
							Title="Bowling figures < 20 runs" 
							Bar1="Runs" 
							Bar2="Wickets" 
							XaxisLabel="GameDate"/>},
			
		]
	
	}
	render () {
			return (
				<div id="Stage">
					<StatStage 
						Title="Bowling figures < 20 runs" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}