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
					if(game.Bowling_BallsBowled > 0 ){			
						Table_Year_Count.push({year:game.Date, Team:game.Against})
					}
				})
			}
	
	
	createPieCountYears(Player)
		{
			pie_yearcount=[];
			Player.map((game,i)=>{	
					
					if(game.Bowling_BallsBowled > 0 ){	
						pie_yearcount.push({year:game.Date})
					}
				})
				
			}

	createPieWinRatio(Player)
		{
			pieWinRatio=[{name:'Won',value:50},{name:'lost',value:50}];
			
				
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
				if(game.Bowling_BallsBowled > 0)
					{
						
						WicketsvsRuns.push({GameDate:game.Date,Runs:game.Bowling_RunsConceded,Wickets:game.Bowling_WicketsTaken});		
				}
			})
	}
	
	
	
	componentWillMount(){ 
	
		// Set Vars
		var ThisObject = this.props.BATTING.BattingObject;
		Count = this.props.BATTING.Facts["0"].Bowling_innings;
		
		// Pie Charts
		this.createPieCountYears(ThisObject)
		this.createPieWinRatio(ThisObject)
		
		// Bar Charts
		this.CreateWicketsvsRuns(ThisObject)
		
		// Calculate Table
		TH=["Team","Games"]
		this.createTablePlayedCountYears(ThisObject)
		
		
		/*
		Overview=[
			{fact:"You have bowled against a total of "+TeamCount[0].length+" unique teams over "+yearcount[0].length+" years"},
			{fact: rows.length+" of which you have strolled to the crease more than once."},
			{fact: DisplayCommon.Team+" being the most common with "+DisplayCommon.count+" games"}
		]*/
	
	
		/* Create the Tab Layout */
	
		Tab_List = [
			{chart:<Stage_Table_Count_Years 
							Title="Career by Opposition (min 2 overs)" 
							TableHeader={TH} 
							TableRow={Table_Year_Count} 
							DisplayClass="col-md-12" />},
		]
		
		Tab_Graph=[
			{chart:<Create_Pie_Count_Years  
							Data={pie_yearcount} 
							Title="Over the Years | Number of Bowling Innings"
							bootstraps="col-md-6" />},
														
			{chart:<Create_Stacked_Bars 
							Data={WicketsvsRuns} 
							Title="Over the Years - Wickets vs Runs - Create a bar chart that is broken into years that shows runs and wickets for those years" 
							Bar1="Runs" 
							Bar2="Wickets" 
							XaxisLabel="GameDate"/>},
			
		]
	
	}
	render () {
			return (
				<div id="Stage">
					<StatStage 
						Title="Bowling Innings" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}