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
		import Pie_IncrimentalAdd from "../../Global/pies/Pie_IncrimentalAdd"
	// Tables
		import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
		import Stage_Table_Count_Items from "../../Global/table/Stage_Table_Count_Items";
		import Stage_4Col_StripedTable from "../../Charts/Stage_4Col_StripedTable";
	//Bars
		import Create_Stacked_Bars from "../../Global/bars/Create_Stacked_Bars";
		

// Variables
// Ints
var Count=0;
// Objects
var Tab_List=[],Tab_Graph=[],Line_Average_PerGame=[],TH=[],pie_Over_count=[],Table_Over_Count=[],onewickethaul=[];


@connect((store) =>{
		return{
			UI: store.UI,
			BATTING:store.BATTING
		}
	})
export default class BasicStats extends React.Component {
	
	// Object Functions
	// Pies
	CreatePieCountArray(Player)
		{
			pie_Over_count=[];
			Player.map((game,i)=>{	
				if(game.Bowling_WicketsTaken == 5)
					{		
					pie_Over_count.push({year:game.Date,value:game.Bowling_WicketsTaken})
				}
			})
	}
	
	// Stacked Bars
	CreateWicketsvsRuns(Player)
		{
			onewickethaul=[];
			Player.map((game,i)=>{
				if(game.Bowling_WicketsTaken == 5)
					{
					onewickethaul.push({Team:game.Against,Runs:game.Bowling_RunsConceded,Wickets:game.Bowling_WicketsTaken});		
				}
			})
		}
	
	
	
	
	// Tables
	createTablePlayedCountYears(Player)
		{
			Table_Over_Count=[];
			Player.map((game,i)=>{	
					if(game.Bowling_WicketsTaken == 5 ){			
						Table_Over_Count.push({col1:game.Date, col2:game.Against, col3:game.Bowling_OversBowled, col4:game.Bowling_Figures})
					}
				})
	}
			
			
	componentWillMount(){ 
	
		// Set Vars
		var PlayerObject = this.props.BATTING.BattingObject;

		// Set Stage INT
		Count = this.props.BATTING.Facts["0"].Bowling_5fa;
		
		
		// Create Objects
		// Pies
		this.CreatePieCountArray(PlayerObject)
		
		// Create Stacked Bars
		this.CreateWicketsvsRuns(PlayerObject)
		
		
		// Tables
		TH=['Date','Team','Overs','Figures'];
		this.createTablePlayedCountYears(PlayerObject)
	
		// Create Tabs
		
		/* Add Content to the 1st Tab */
		Tab_List = [
			{chart:<Stage_4Col_StripedTable 
						Title="5 Wicket Hauls Overs by Opposition" 
						TableHeader={TH} 
						TableData={Table_Over_Count} 
						DisplayClass="col-md-12" />},
		
		
		]
		
		
		/* Add graphs to the 2nd Tab */
		Tab_Graph=[
			{chart:<Pie_IncrimentalAdd 
						Data={pie_Over_count} 
						Title="5 Wicket Hauls" />},
							
			{chart:<Create_Stacked_Bars 
							Data={onewickethaul} 
							Title="5 Wicket Hauls" 
							Bar1="Runs" 
							Bar2="Wickets" 
							XaxisLabel="Team"/>},
			
					
		]
	}
	
	render () {
			return (
				<div id="stage">
					<StatStage 
						Title="5 Wicket Hauls" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}