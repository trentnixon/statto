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
		import Create_Pie_Count_Items from "../../Global/pies/Pie_IncrimentalAdd";
	// Tables
		import Stage_Table_Count_Years from "../../Global/table/Stage_Table_Count_Years";
		import Stage_Table_Count_Items from "../../Global/table/Stage_Table_Count_Items";
	// Bars
	import Create_Stacked_Bars from "../../Global/bars/Create_Stacked_Bars";

// Variables
// Ints
var Count=0;
// Objects
var Tab_List=[],Tab_Graph=[],Line_Average_PerGame=[],TH=[],pie_Over_count=[],Table_Over_Count=[],WicketsvsRuns=[];


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
					if(game.Bowling_OversBowled_parsed == 4)
						{	
						pie_Over_count.push({year:game.Date,value:game.Bowling_OversBowled_parsed})
					}
			})
	}
	
	// Bars
	CreateWicketsvsRuns(Player)
		{
			WicketsvsRuns=[];
			
			Player.map((game,i)=>{
				if(game.Bowling_OversBowled_parsed == 4)
					{
						
						WicketsvsRuns.push({Against:game.Against,Runs:game.Bowling_RunsConceded,Wickets:game.Bowling_WicketsTaken});		
				}
			})
			console.log(WicketsvsRuns)
	}
	
	
	// Tables
	createTablePlayedCountYears(Player)
		{
			Table_Over_Count=[];
			Player.map((game,i)=>{	
					if(game.Bowling_BallsBowled > 0 ){			
						Table_Over_Count.push({name:game.Against, value:game.Bowling_OversBowled_parsed})
					}
				})
	}
			
			
	componentWillMount(){ 
	
		// Set Vars
		var PlayerObject = this.props.BATTING.BattingObject;

		// Set Stage INT
		Count = this.props.BATTING.Facts["0"].Bowling_BowledOut;
		
		
		// Create Objects
		// Pies
		this.CreatePieCountArray(PlayerObject)
		
		// Bar Charts
		this.CreateWicketsvsRuns(PlayerObject)
		
		// Tables
		TH=["Team","Overs"];
		this.createTablePlayedCountYears(PlayerObject)
	
		/*
			Economy rates when all for over have been bowled
		
		
		*/
	
		// Create Tabs
		
		/* Add Content to the 1st Tab */
		Tab_List = [
			{chart:<Stage_Table_Count_Items 
						Title="Overs by Opposition" 
						TableHeader={TH} 
						TableRow={Table_Over_Count} 
						DisplayClass="col-md-12" />},
		
		
		]
		
		
		/* Add graphs to the 2nd Tab */
		Tab_Graph=[
			{chart:<Create_Pie_Count_Items 
						Data={pie_Over_count} 
						Title="Overs Bowled by  Years" />},
							
			{chart:<Create_Stacked_Bars 
							Data={WicketsvsRuns} 
							Title="4 Overs Completed" 
							Bar1="Runs" 
							Bar2="Wickets" 
							XaxisLabel="Against"/>},
		]
	}
	
	render () {

			return (
				<div id="stage">
					<StatStage 
						Title="Career Overs" 
						WidgetCount={Count}
						Tab_List={Tab_List}
						Tab_Graph={Tab_Graph}
					/>
				</div>
			)
	}
}